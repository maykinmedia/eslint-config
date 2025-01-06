import js from "@eslint/js";
import globals from "globals";

// Base environment, targetting modern browsers and/or bundler toolchains.
//
// We deliberately do not specify any file (extension) patterns, since these rules
// typically apply to all JS-like source code.
const environment = {
  name: "maykin/environment",
  settings: {
    // technically this belongs in the react module, but it will be ignored if no
    // react plugins are present and it *is* a sane default that applies to many of
    // our projects.
    react: {
      version: "detect",
    },
  },
  languageOptions: {
    globals: {
      ...globals.builtin,
      ...globals.browser,
    },
  },
};

const base = [
  environment,
  // Standard JS rules from ESLint itself
  {
    name: "eslint/js",
    ...js.configs.recommended
  },
];


/**
 * Helper to avoid linting build artifacts.
 *
 * This should typically be your first rule in the config so that it always ignores the
 * directories listed.
 *
 * @param  {String[]} dirNames  Pass in an array of (relative) directory names, without slashes.
 *                              By default, `dist`, `build` and `storybook-static` are ignored.
 * @return {{name: string, ignores: string[]}} A config entry with glob patterns to ignore the specified dirs.
 */
const ignoreBuildArtifacts = (dirNames = ["dist", "build", "storybook-static"]) => ({
  name: "project/ignore build artifacts",
  ignores: dirNames.map(name => `${name}/**/*`),
});

export {base, environment, ignoreBuildArtifacts};
