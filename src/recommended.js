import prettierRecommended from "eslint-plugin-prettier/recommended";

import {base} from "./base.js";
import react, {reactIntl} from "./react.js";
import storybook from "./storybook.js";
import typescript from "./typescript.js";
import importConfig from "./imports.js";
import typescriptImports from "./import-with-typescript.js";

/**
 * The Maykin recommended configuration, for 'typical' projects.
 *
 * Most of our projects use React. New projects are typically done using Typescript and
 * older ones are migrating or wish to do so.
 */
const recommended = [
  // Basic JS
  ...base,
  // Typescript
  ...typescript,
  // Import/export
  importConfig,
  ...typescriptImports,
  // React
  ...react,
  reactIntl,
  // Prettier (avoid conflicts)
  {
    name: "prettier/recommended",
    ...prettierRecommended,
  },
  // Storybook
  ...storybook,
];

export default recommended;
