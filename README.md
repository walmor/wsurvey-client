# wSurvey - Front-end

This is the front-end part of the _wSurvey_ project, which is a simple project to demonstrate my full-stack software development skills, my knowledge of best practices and also is used to try out new things.

It's a simple survey app, similar to Google Forms, but is still a work in progress.

## Core

The front-end started with React 15.x and bootstrapped using [create-react-app](https://github.com/facebook/create-react-app). The plan is to update the project to use React 16.x and use its new features such as [Suspense](https://medium.com/@baphemot/understanding-react-suspense-1c73b4b0b1e6) and [Hooks](https://reactjs.org/docs/hooks-intro.html).

To talk to the server, which is a GraphQL API, the project is using the excellent [Apollo Client](https://www.apollographql.com/docs/react/) library, using [Apollo Components](https://www.apollographql.com/docs/react/react-apollo-migration) (available since version 2.1) turning the integration with the GraphQL API much easier. Apollo is also being used for [state management](https://www.apollographql.com/docs/react/essentials/local-state), eliminating the need for Redux.

## Design

The project is using the [Ant Design](https://ant.design/) UI framework which, in my opinion, is one of the best ones. It looks awesome and has a bunch of high-quality components.

I'm also following some [Responsive Design guidelines](https://developers.google.com/web/fundamentals/design-and-ux/responsive/), especially making using of media queries, so the app can be used on laptops, tablets, and phones without problems.

## Styling

The CSS preprocessor [SASS](https://sass-lang.com/) (with SCSS syntax) was used to style the application. The SCSS files were organized following the [7-1 architecture pattern](https://sass-guidelin.es/#the-7-1-pattern) and some tips of the [Sass Guidelines](https://sass-guidelin.es/) were adopted as well.

To better structure the CSS classes, some naming conventions were tested like BEM and OOCSS. However, after some experiments, the [SUIT name convention](https://suitcss.github.io/) was chosen because it plays well with React components. But maybe it's just a personal preference.

## Linters

The project is using [ESLint](https://eslint.org), one of the most popular JavaScript linters, together with the rules provided by the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript), with just some few customizations.

The [Stylelint](https://stylelint.io/) linter, in conjunction with the SASS guidelines, is also used to format and verify the project's SCSS code.

## License

This project is [MIT licensed](LICENSE).
