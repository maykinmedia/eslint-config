import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";

const react = [
  jsxA11y.flatConfigs.recommended,
  {
    name: "react:recommended",
    ...reactPlugin.configs.flat.recommended,
  },
  {
    name: "react:jsx-runtime",
    ...reactPlugin.configs.flat["jsx-runtime"],
  },
  {
    plugins: {"react-hooks": hooksPlugin},
    rules: hooksPlugin.configs.recommended.rules,
  },
];

// react-intl needs some allow-listing when using their components
const reactIntl = {
  name: "maykin:react-intl",
  rules: {
    "react/style-prop-object": [
      "error",
      {
        allow: [
          "FormattedNumber",
          "FormattedDateParts",
          "FormattedRelativeTime",
        ],
      },
    ],
  },
};

export default react;
export {reactIntl};
