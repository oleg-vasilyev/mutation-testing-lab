# TODO app

Application to demonstrate the mutation testing approach

## Getting started
### Requirements

- [Node](https://nodejs.org/en/download/)

  > Make sure you have Node in your environment path. Run `node -v` to check

### Frontend part

- clone this repository

- restore all dependencies

  - from root run `npm ci`
    > `root` - the place where package.json is

- start application

  - from root of the repo run `npm start` to host and run the application
    > The application starts in development mode
    
    > The application will be available at http://localhost:56354

## Testing / Code Quality Assurance
### Unit testing
  > Chrome browser required
- run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io)

- run `npm run test:coverage` to execute the unit tests with coverage report
  > Detailed coverage report is located in `./reports/coverage` folder

### Mutation testing
  > Chrome browser required
- run `npm run test:mutation` to execute the unit tests with mutation report
  > Detailed mutation report is located in `./reports/mutation` folder

  > [Mutant states and metrics](https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/)

### JS static validation

- run `npm run eslint` to be sure that TS files follow all the required rules

## Suggested tools and extensions

[Visual Studio Code](https://code.visualstudio.com) - recommended cross-platform code editor. Suggested extensions, tasks, debug configuration and commonly shared settings for Visual Studio Code will be automatically loaded from `./.vscode/`

- [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template#review-details) - provides a rich editing experience for Angular templates
- [Angular template formatter](https://marketplace.visualstudio.com/items?itemName=stringham.angular-template-formatter) - put each HTML attribute on its own line, unless there is a single attribute declared on the HTML tag
  > Use `"Shift + Alt + F"` shortcut to apply formatting
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - TS static analysis tool
  > Run `npm run eslint` to make sure that TS files follow all the required rules
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - a plugin for `.editorconfig`

## Environments

stage  | url                                         | comments                      
------ | ------------------------------------------- | ------------------------------
local  | http://localhost:56354                      | used for development


## Related links
- [Stryker Mutator](https://stryker-mutator.io/)
- [Angular Material](https://material.angular.io)
