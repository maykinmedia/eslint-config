# ESLint config

Shared configuration for [ESLint](https://eslint.org/) for consistent rules across
Maykin projects.

[![NPM Version](https://img.shields.io/npm/v/%40maykinmedia%2Feslint-config)](https://www.npmjs.com/package/@maykinmedia/eslint-config)

This package exposes a set of standard/recommended rules for ESLint code checks. You can
still decide to override certain rules/configurations on a per-project basis - a nice
feature of ESLint's flat config format. See below for example configurations.

## Installation

The recommended installation includes all optional plugins. These should not get in the
way if you're not using all features (e.g. a project without React or Typescript).

```bash
npm install \
    --save-dev \
    @maykinmedia/eslint-config \
    eslint-plugin-import \
    eslint-plugin-jsx-a11y \
    eslint-plugin-prettier \
    eslint-plugin-react \
    eslint-plugin-react-hooks \
    eslint-plugin-storybook \
    typescript-eslint \
    eslint-import-resolver-typescript
```

Optional plugins are specified as peer dependencies, required plugins will be pulled in
automatically.

## Usage

Create a file `eslint.config.js` and compose the configuration:

```js
// eslint.config.mjs
import {ignoreBuildArtifacts} from '@maykinmedia/eslint-config';
import recommended from '@maykinmedia/eslint-config/recommended';

export default [
  // dist, build and storybook-static are the defaults
  ignoreBuildArtifacts(['dist', 'build', 'storybook-static']),
  ...recommended,
];
```

See [Overrides](#overrides) for how to add overrides.

You can use the [config-inspector](https://github.com/eslint/config-inspector) to
inspect what the final composed config is for your project.

### Recommended

The recommended configuration assumes modern setups with Typescript, React and Storybook.
Even if you don't use all of these components of the stack, you can still use the
recommended configuration.

For company-wide consistency, we really encourage you to use the recommended config.

**Required plugins**

* [React](#react) plugins
* [Typescript](#typescript) plugins
* `eslint-plugin-import`
* `eslint-plugin-prettier`
* `eslint-plugin-storybook`

**Usage**

See [Usage](#usage) above.

## Configuration parts

The (recommended) and available configuration is broken up around various (optional)
plugins. The recommended config is composed from these parts. Each part is documented
below.

### Base

> [!TIP]
> Included in the recommended config.

The base configuration is the absolute minimum. It sets up the environment and enables
the recommended rules from ESLint itself. Additionally, it provides a helper to prevent
linting build artifacts, as that hurts performance.

```js
import {base, ignoreBuildArtifacts} from '@maykinmedia/eslint-config/base';

export default [
  ignoreBuildArtifacts(['dist']),
  ...base,
]
````

### Typescript

> [!TIP]
> Included in the recommended config.

The typescript configuration enables parsing of TS source code with type annotations.

We essentially re-export the `typescript-eslint` recommended configuration without
additional tweaks.

**Required plugins**

* `typescript-eslint`

```js
import typescript from '@maykinmedia/eslint-config/typescript';

export default [
  ...,
  ...typescript,
  ...,
]
```

### React

> [!TIP]
> Included in the recommended config.

The React config enables:

* JSX accessibility checks that can be done statically
* the recommended react plugin configuration
* the JSX automatic runtime
* react hooks checking

**Required plugins**

* `eslint-plugin-jsx-a11y`
* `eslint-plugin-react`
* `eslint-plugin-react-hooks`

**react-intl support**

If you use react-intl for internationalization, you'll want to use the relevant
override if you're not using the recommended config.

```js
import {react, reactIntl} from '@maykinmedia/eslint-config/react';

export default [
  ...,
  ...react,
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

### Storybook

> [!TIP]
> Included in the recommended config.

Storybook itself provides a plugin to lint your story files. Additionally, we enable
checking of the `.storybook` configuration folder.

**Required plugins**

* `eslint-plugin-storybook`

```js
import storybookConfig from '@maykinmedia/eslint-config/storybook';

export default [
  ...,
  ...storybookConfig,
  ...,
]
```

### Import/export

> [!TIP]
> Included in the recommended config.

Import/export linting protects against broken imports and can help enforce consistent
import/export styles. Additionally, our rules block using "legacy" `require` and `define`
import systems in favour of the `import`/`export` module system. We also prevent
bundler-specific import syntax (e.g. webpack-specific import directives) to avoid tight
coupling with a particular bundler.

The recommended configuration assumes you're either using Typescript, or `jsconfig.json`
with base URLs/path aliases and for that reason, the `src` directory is automatically
added to the module resolution.

**Required plugins**

* `eslint-plugin-import`
* `eslint-import-resolver-typescript` when integrating with Typescript

```js
import importConfig from "@maykinmedia/eslint-config/imports";
import typescriptImports from "@maykinmedia/eslint-config/import-with-typescript";

export default [
  importConfig,
  ...typescriptImports,
]
```

### Project specific overrides

Finally, and especially when adapting existing projects, you may want to apply certain
project-specific overrides. This can be because you're using something else, or there are
known linting violations that are just too much work to address right now.

You can easily apply overrides on top of the recommend config by including your own
configuration objects - ESLint applies them all and on conflict, the last one wins.

For example, a recommend config with project specific overrides:

```js
import {ignoreBuildArtifacts} from '@maykinmedia/eslint-config';
import recommended from '@maykinmedia/eslint-config/recommended';

export default [
  // dist, build and storybook-static are the defaults
  ignoreBuildArtifacts(['dist', 'build', 'storybook-static']),
  ...recommended,
  // Project-specific overrides.
  {
    name: 'project/ignore-tests',
    ignores: ['**/*.{spec,test}.{js,jsx,ts,tsx}'],
  },
  {
    name: 'project/allow-webpack-imports',
    rules: {
      'import/no-webpack-loader-syntax': 'off',
    },
  }
];
```

We recommend always providing a `name` for a rule as that makes it easier to identify
when using the config inspector.

## Contributing

> [!NOTE]
> It's likely that only contributions from Maykin employees will be accepted, as this
> package is aimed at Maykin projects. However, we won't stop you from making bugfixes and
> suggestions, we just can't promise that we'll agree with them.

The various configuration snippets are in the `src/` folder. They are organized based on
the optional dependencies, i.e. you should be able to use the base config without having
`eslint-plugin-react` installed, or `typescript` support should be available without the
`eslint-plugin-import` being present.

The recommended configuration assumes that all optional dependencies are available, as
that is what we recommend.
