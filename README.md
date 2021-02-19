# Getting Started with Tindoori

## Setup

### Code Editor

Please install the `eslint` plugin. This will warn you when your codestyle is incorrect.
Optionally, you can install `prettier`. This plugin will format your code automatically based on the eslint rules. Read the prettier manual to set it up correctly.

## Starting the project

First run `npm install` in the root directory of the project. This ensures you have all the necessary npm packages to get started.

Running `npm start` will start the project on your localhost. The page will reload if you make edits. You will also see any lint errors in the console.

## Code style

By default, we're using the AirBnB codestyle (https://github.com/airbnb/javascript) in combination with the Prettier plugin. These rules are strict and will help us maintain consistent and readible code. If you think the rules are too strict, discuss it with the team. We can add exceptions to the checks.

## Git flow

We are working with git flow. See this link for further explination: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow#:~:text=Gitflow%20Workflow%20is%20a%20Git,designed%20around%20the%20project%20release.

## Commits

We are using `husky` in combination with eslint to check each commit. If you have formatting errors, husky will try to fix these automatically. Logical errors need to be fixed manually. **Commiting wont work if you have errors in your code!**
