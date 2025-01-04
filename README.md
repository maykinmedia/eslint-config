# ESLint config

Shared configuration for [ESLint](https://eslint.org/) for consistent rules across
Maykin projects.

This package exposes a set of standard/recommended rules for ESLint code checks. You can
still decide to override certain rules/configurations on a per-project basis - a nice
feature of ESLint's flat config format. See below for example configurations.

## Installation

**Requirements**

* ESLint v8+, v9 recommended as it defaults to flat config.

**Install from npm**

```bash
npm install \
    --save-dev \
    eslint \
    eslint-plugin-import \
    eslint-plugin-jsx-a11y \
    eslint-plugin-prettier \
    eslint-plugin-react \
    eslint-plugin-react-hooks \
    eslint-plugin-storybook \
    typescript-eslint \
    eslint-import-resolver-typescript \
    @maykinmedia/eslint-config
```

Optional plugins are specified as peer dependencies, required plugins will be pulled in
automatically.

## Usage

Create a file `eslint.config.js` and compose the configuration:

```js
import {ignoreBuildArtifacts} from '@maykinmedia/eslint-config';
import recommended from '@maykinmedia/eslint-config/recommended';

export default [
  ignoreBuildArtifacts(['dist', 'build']), // dist and build are the defaults
  ...recommended,
  // Project-specific overrides...
  // {
  //   'name': 'project:overrides',
  //   'rules': {
  //     'some-rule': 'off',
  //   },
  // },
];
```

When there are conflicts between rules, the last one wins.

You can use the [config-inspector](https://github.com/eslint/config-inspector) to
inspect what the final composed config is for your project.

### Recommended

Required plugins:

* [React](#react) plugins
* [Typescript](#typescript) plugins
* `eslint-plugin-import`
* `eslint-plugin-prettier`
* `eslint-plugin-storybook`

...

### Basic

...

### React

> [!TIP]
> Included in the recommended config.

Required plugins:

* `eslint-plugin-jsx-a11y`
* `eslint-plugin-react`
* `eslint-plugin-react-hooks`

The React config enables:

* JSX accessibility checks that can be done statically
* the recommended react plugin configuration
* the JSX automatic runtime
* react hooks checking

**react-intl support**

If you use react-intl for internationalization, you'll want to use the relevant
override if you're not using the recommended config.

```js
// eslint.config.mjs
import {reactIntl} from '@maykinmedia/eslint-config/react';

export default [
  ...,
  reactIntl,
  ...,
]
```

**Disabling exhaustive deps checking**

The default React configuration enables hook dependency array checking, which may be
very frustrating when adopting ESLint into an existing project. You can disable the
relevant rule in your [Project specific overrides](#project-specific-overrides):

```js
{
  name: 'project:react-hooks:disable-exhaustive-deps',
  rules: {
    'react-hooks/exhaustive-deps': 'off',
  },
}
```


### Typescript

> [!TIP]
> Included in the recommended config.

Required plugins:

* `typescript-eslint`

...

### Storybook

> [!TIP]
> Included in the recommended config.

Required plugins:

* `eslint-plugin-storybook`

...

### Project specific overrides

...

## Contributing

The various configuration snippets are in the `src/` folder. They are organized based on
the optional dependencies, i.e. you should be able to use the base config without having
`eslint-plugin-react` installed, or `typescript` support should be available without the
`eslint-plugin-import` being present.

The recommended configuration assumes that all optional dependencies are available, as
that is what we recommend.
