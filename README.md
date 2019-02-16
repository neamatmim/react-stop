# Learn How To Use:

1. To Run Yarn command in a selected workspace

```
yarn workspace your_project_name add react react-dom --dev
```

To remove a package:

```
yarn workspace your_project_name remove some-package --save
```

workspace dependency tree

```
yarn workspaces info
```

run the chosen Yarn command in each workspace.

```
yarn workspaces run test
```

To Shallowly installs a package’s sibling workspace dependencies underneath its node_modules folder. This allows you to run that workspace without building the other workspaces it depends on.

```
yarn install --focus
```

To Install all the dependencies, but only allow one version for each package. On the first run this will prompt you to choose a single version for each package that is depended on at multiple version ranges. These will be added to your package.json under a resolutions field.

```
yarn install --flat
```

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
