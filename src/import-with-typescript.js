// Both the import and typescript plugin are optional dependencies.
import importPlugin from "eslint-plugin-import";

const typescriptImports = [
  {
    name: "maykin:import:typescript-resolver",
    settings: {
      "import/resolver": {
        typescript: true,
      },
    }
  },
  importPlugin.flatConfigs.typescript,
];

export default typescriptImports;
