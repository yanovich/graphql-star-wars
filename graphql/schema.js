// @flow strict

import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  buildSchema,
} from 'graphql';

/**
 * This is designed to be an end-to-end test, demonstrating
 * the full GraphQL stack.
 *
 * We will create a GraphQL schema that describes the major
 * characters in the original Star Wars trilogy.
 *
 * NOTE: This may contain spoilers for the original Star
 * Wars trilogy.
 */

/**
 * Using our shorthand to describe type systems, the type system for our
 * Star Wars example is:
 */

const text = `
enum Episode { NEWHOPE, EMPIRE, JEDI }

interface Character {
  id: String!
  name: String
  friends(first: Int): [Character]
  appearsIn: [Episode]
  secretBackstory: String
}

type Human implements Character {
  id: String!
  name: String
  friends(first: Int): [Character]
  appearsIn: [Episode]
  secretBackstory: String
  homePlanet: String
}

"A mechanical creature in the Star Wars universe."
type Droid implements Character {
  id: String!
  name: String
  friends(first: Int): [Character]
  appearsIn: [Episode]
  secretBackstory: String
  primaryFunction: String
}

type Query {
  hero(
    "If omitted, returns the hero of the whole saga. If provided, returns the hero of that particular episode."
    episode: Episode
  ): Character 
  human(
    "id of the human"
    id: String!
  ): Human
  droid(
    "id of the droid"
    id: String!
  ): Droid
}
`;

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const schema = new buildSchema(text);
