# Contributing Guide

Hi! We are really excited that you are interested in contributing to `@unvuetify/monorepo`. Before submitting your contribution, please make sure to take a moment and read through the following guide.

Refer also to https://github.com/antfu/contribute.

## Set up your local development environment

The `@unvuetify/monorepo` repo is a monorepo using pnpm workspaces. The package manager used to install and link dependencies must be [pnpm](https://pnpm.io/).

To develop and test any `@unvuetify/monorepo` package:

1. Fork the `@unvuetify/monorepo` repository to your own GitHub account and then clone it to your local device.

2. `@unvuetify/monorepo` uses pnpm v10 and Node 22. If you are working on multiple projects with different versions of pnpm, it's recommended to enable [Corepack](https://github.com/nodejs/corepack) by running `npm i -g corepack@latest && corepack enable`.

3. Check out a branch where you can work and commit your changes:
```shell
git checkout -b my-new-branch
```

5. Run `pnpm install` in `@unvuetify/monorepo`'s root folder

6. Run `nr stub` in `@unvuetify/monorepo`'s root folder.

7. WIP: run the tests

8. Run the fix lint and typecheck scripts: `pnpm lint:fix` and `pnpm test:typecheck`.

9. Commit and push your changes to your fork using conventional commits. Then, create a pull request to the `main` branch of the `@unvuetify` repository:

```shell
git add .
git commit -m "feat: my new feature"
git push origin my-new-branch-or-feature
```

## CI errors

Sometimes when you push your changes to create a new pull request (PR), the CI can fail, but we cannot check the logs to see what went wrong.

If you are getting the **Semantic Pull Request** error, please check the [Semantic Pull Request](https://www.conventionalcommits.org/en/v1.0.0/#summary) documentation.

You can run the following commands in your local environment to fix CI errors:

- `pnpm lint` to lint the code changes
- `pnpm test:typecheck` to run TypeScript checks run on CI

## Notes

To run the playground you need to `stub` the packages and the run the `dev` script:
- from root run `nr stub`
- from the corresponding playground folder run `nr dev`

To run the typecheck script, you need to build the packages first and then run the typecheck script:
- from root run `nr build`
- from the corresponding package folder run `nr test:typecheck`
