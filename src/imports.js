import importPlugin from "eslint-plugin-import";

const importConfig = {
  settings: {
    "import/resolver": {
      // for typescript, see import-with-typescript.js, as it requires an extra (optional) plugin
      node: {
        // if a project uses jsconfig.json, it's likely that import shorthands/aliases
        // are set up relative to the `src` directory.`
        moduleDirectory: ['src', 'node_modules'],
      },
    },
  },
  ...importPlugin.flatConfigs.recommended,
  languageOptions: {
    ...importPlugin.flatConfigs.recommended.languageOptions,
    ecmaVersion: "latest",
  },
  rules: {
    ...importPlugin.flatConfigs.recommended.rules,
    "import/first": "error",
    "import/no-amd": "error",
    "import/no-anonymous-default-export": "warn",
    "import/no-webpack-loader-syntax": "error",
  },
};

export default importConfig;
