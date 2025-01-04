import storybook from "eslint-plugin-storybook";
import globals from "globals";

const storybookConfig = [
  // Storybook stories
  ...storybook.configs["flat/recommended"],
  {
    name: "maykin/storybook/check-config",
    ignores: ["!.storybook"],
  },
  {
    name: "maykin/storybook/test-runner",
    files: [".storybook/test-runner-jest.{cjs,js}"],
    languageOptions: {
      globals: globals.commonjs,
    },
  },
];

export default storybookConfig;
