import storybook from "eslint-plugin-storybook";
import globals from "globals";

const storybookConfig = [
  // Storybook stories
  ...storybook.configs["flat/recommended"],
  {
    name: "project:storybook:check-config",
    ignores: ["!.storybook"],
  },
  {
    name: "project:storybook:test-runner",
    files: [".storybook/test-runner-jest.{cjs,js}"],
    languageOptions: {
      globals: globals.commonjs,
    },
  },
];

export default storybookConfig;
