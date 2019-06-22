# GraphQL Star Wars

GraphQL `buildSchema()` is powerful enough to generate responses shown in [GraphQL documentation](https://graphql.org/learn/schema/) without direct manipulation of AST.

I took code from [GraphQL tests](https://github.com/graphql/graphql-js/tree/a9a21f3081acfa4740ad392e28239d09befe8b9c/src/__tests__) and refactored schema definition to plain text for `buildSchema`.

I needed this to understand how GraphQL links schema nodes to resolvers. It boils down to [`defaultFieldResolver`](https://github.com/graphql/graphql-js/blob/a9a21f3081acfa4740ad392e28239d09befe8b9c/src/execution/execute.js#L1214-L1228) in `execute/execute.js`.
