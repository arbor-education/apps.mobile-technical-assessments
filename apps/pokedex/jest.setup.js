"use strict";

// jest v30.2.0 enforces isInsideTestCode === false in _execModule, which causes
// expo's winter runtime lazy getters to throw when accessed after test teardown.
// Pre-resolving all lazy getters registered by expo/src/winter here (setupFilesAfterEnv
// runs before isInsideTestCode is ever set to false) causes each lazy property to be
// replaced with a plain value, preventing future require() calls through the getters.
const expoWinterGlobals = [
  "__ExpoImportMetaRegistry",
  "structuredClone",
  "TextDecoder",
  "TextDecoderStream",
  "TextEncoderStream",
  "URL",
  "URLSearchParams",
];

for (const name of expoWinterGlobals) {
  const descriptor = Object.getOwnPropertyDescriptor(global, name);
  if (descriptor && typeof descriptor.get === "function") {
    void global[name];
  }
}
