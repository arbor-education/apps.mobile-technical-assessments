import { Tabs } from "expo-router";
import { Computer, Settings2, useTheme } from "@arbor-apps/ui";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
        },
      }}
    >
      <Tabs.Screen
        name="pokedex"
        options={{
          tabBarIcon: ({ focused }) => (
            <Computer
              size={24}
              c={focused ? theme.primary.val : theme.textMuted.val}
              mt="$4"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <Settings2
              size={24}
              c={focused ? theme.primary.val : theme.textMuted.val}
              mt="$4"
            />
          ),
        }}
      />
    </Tabs>
  );
}
