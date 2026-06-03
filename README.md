# The Ultimate Pokédex

A professional Pokédex application built as a Turborepo monorepo. This repository serves as the base for a mobile technical assessment.

---

## Project Overview

The app allows users to log in, browse a Pokédex, view individual Pokémon details, and track their personal collection status (hunting, caught, shiny, ignored). It is built with a clean architecture that separates concerns across shared packages and demonstrates patterns for reactive data, state management, localisation, and theming.

---

## Monorepo Structure

```
apps/
  pokedex/          # Main React Native (Expo) application
packages/
  db/               # WatermelonDB schema, models, migrations, and database instance
  translations/     # i18next configuration and locale strings (English + Welsh)
  ui/               # Shared UI component library powered by Tamagui
  eslint-config-custom/  # Shared ESLint config
  typescript-config/     # Shared tsconfig bases
```

---

## Apps

### `apps/pokedex`

The main application. Built with Expo SDK 56, using file-based routing via expo-router.

**Internal structure (`src/`):**

| Directory | Purpose |
|---|---|
| `src/store/` | Redux Toolkit store — `userSlice` (auth state) and `themeSlice` (light/dark mode) |
| `src/hooks/` | `useAuth` (login/logout against WatermelonDB), `useTheme` (theme toggle) |
| `src/services/` | TanStack Query hooks that bridge WatermelonDB async operations |
| `src/components/` | Complex reusable components (`PokemonCard` with `withObservables`, `StatusPicker`) |
| `src/screens/` | Full screen components — `LoginScreen`, `PokemonListScreen`, `PokemonDetailScreen`, `SettingsScreen` |

**Routes:**

| Route | Screen |
|---|---|
| `/` | Auth-based redirect (→ `/login` or `/(tabs)/pokedex`) |
| `/login` | Login screen |
| `/(tabs)/pokedex` | Pokémon list (FlashList) |
| `/(tabs)/settings` | Language + theme toggles, logout |
| `/pokemon/[id]` | Pokémon detail + status picker |

---

## Packages

### `@arbor-apps/db`

WatermelonDB setup. Contains the schema, model classes, migration infrastructure, and the singleton `database` instance consumed across the app.

**Schema tables:** `users`, `pokemon`, `user_pokemon`

`user_pokemon.status` accepts: `hunting | caught | shiny | ignored`

To add a schema migration, add an entry to the `migrations` array in `src/migrations.ts`:

```ts
{
  toVersion: 2,
  steps: [
    addColumns({ table: 'pokemon', columns: [{ name: 'height', type: 'number' }] }),
  ],
}
```

---

### `@arbor-apps/translations`

i18next configuration with English (`en`) and Welsh (`cy`) locale files. Initialised as a side effect when imported — the app imports this once at the root layout.

Exports `i18n` (the i18next instance) and re-exports `useTranslation` from `react-i18next`.

To add a new language: add a locale JSON file under `src/locales/` and register it in `src/index.ts`.

---

### `@arbor-apps/ui`

Shared component library. **All Tamagui usage is contained within this package** — the app never imports directly from `tamagui`.

**Exports:**
- `Button` — Tamagui-powered button component
- `AppProvider` — wraps children in `TamaguiProvider` + `Theme`; accepts a `theme: 'light' | 'dark'` prop
- `tamaguiConfig` — the Tamagui config object (based on `@tamagui/config/v4`)

The app wires the `AppProvider` to the Redux `themeSlice` via a `ThemeWrapper` component in the root layout.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- Yarn 1.22.x
- Xcode (iOS) or Android Studio (Android)

### Install dependencies

```sh
yarn install
```

### Run on iOS

```sh
yarn workspace pokedex ios
```

### Run on Android

```sh
yarn workspace pokedex android
```

### Start the dev server

```sh
yarn dev
```

---

## Key Commands

| Command | Description |
|---|---|
| `yarn dev` | Start all apps in dev mode (via Turbo) |
| `yarn build` | Build all packages |
| `yarn check-versions` | Lint for version mismatches across workspaces (syncpack) |
| `yarn sync-versions` | Auto-fix version mismatches |
| `yarn format` | Run Prettier across the repo |

---

## Installing Packages

### Shared / tooling packages

Install at root so all workspaces share a single copy:

```sh
yarn add -W <package>       # production dependency
yarn add -W -D <package>    # dev dependency
```

Reference it in sub-packages using `"*"` as the version.

### App or package-specific packages

```sh
yarn workspace <workspace-name> add <package>
# e.g.
yarn workspace parent add expo-camera
yarn workspace @arbor-apps/ui add some-ui-lib
```

After any install, run `yarn check-versions` to verify no version mismatches were introduced.

> React Native and Expo packages should live in the app that uses them, not at root.

---

## Tech Stack

| Concern | Library |
|---|---|
| Framework | React Native (Expo SDK 54) |
| Navigation | expo-router (file-based) |
| Database | WatermelonDB (SQLite) |
| Reactivity | `@nozbe/with-observables` |
| State management | Redux Toolkit |
| Data fetching | TanStack Query (React Query v5) |
| UI / Theming | Tamagui |
| Localisation | i18next + react-i18next |
| List performance | `@shopify/flash-list` |
| Monorepo | Turborepo + Yarn Workspaces |
| Version management | syncpack |
