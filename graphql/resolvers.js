// @flow strict

/**
 * This defines a basic set of data for our Star Wars Schema.
 *
 * This data is hard coded for the sake of the demo, but you could imagine
 * fetching this data from a backend service rather than from hardcoded
 * JSON objects in a more complex demo.
 */

const EPISODES = [
  null,
  null,
  null,
  null,
  "NEWHOPE",
  "EMPIRE",
  "JEDI"
];

const luke = {
  __typename: 'Human',
  id: '1000',
  name: 'Luke Skywalker',
  friendsData: ['1002', '1003', '2000', '2001'],
  friends: getFriends,
  secretBackstory: getSecretBackStory,
  appearsInData: [4, 5, 6],
  appearsIn: getEpisodes,
  homePlanet: 'Tatooine',
};

const vader = {
  __typename: 'Human',
  id: '1001',
  name: 'Darth Vader',
  friendsData: ['1004'],
  friends: getFriends,
  secretBackstory: getSecretBackStory,
  appearsInData: [4, 5, 6],
  appearsIn: getEpisodes,
  homePlanet: 'Tatooine',
};

const han = {
  __typename: 'Human',
  id: '1002',
  name: 'Han Solo',
  friendsData: ['1000', '1003', '2001'],
  friends: getFriends,
  secretBackstory: getSecretBackStory,
  appearsInData: [4, 5, 6],
  appearsIn: getEpisodes,
};

const leia = {
  __typename: 'Human',
  id: '1003',
  name: 'Leia Organa',
  friendsData: ['1000', '1002', '2000', '2001'],
  friends: getFriends,
  secretBackstory: getSecretBackStory,
  appearsInData: [4, 5, 6],
  appearsIn: getEpisodes,
  homePlanet: 'Alderaan',
};

const tarkin = {
  __typename: 'Human',
  id: '1004',
  name: 'Wilhuff Tarkin',
  friendsData: ['1001'],
  friends: getFriends,
  secretBackstory: getSecretBackStory,
  appearsInData: [4],
  appearsIn: getEpisodes,
};

const humanData = {
  '1000': luke,
  '1001': vader,
  '1002': han,
  '1003': leia,
  '1004': tarkin,
};

const threepio = {
  __typename: 'Droid',
  id: '2000',
  name: 'C-3PO',
  friendsData: ['1000', '1002', '1003', '2001'],
  friends: getFriends,
  secretBackstory: getSecretBackStory,
  appearsInData: [4, 5, 6],
  appearsIn: getEpisodes,
  primaryFunction: 'Protocol',
};

const artoo = {
  __typename: 'Droid',
  id: '2001',
  name: 'R2-D2',
  friendsData: ['1000', '1002', '1003'],
  friends: getFriends,
  secretBackstory: getSecretBackStory,
  appearsInData: [4, 5, 6],
  appearsIn: getEpisodes,
  primaryFunction: 'Astromech',
};

const droidData = {
  '2000': threepio,
  '2001': artoo,
};

Object.keys(humanData).forEach((human) => {
  if (human.friends) {
    human.friends.bind(human);
    human.appearsIn.bind(human);
  }
})

Object.keys(droidData).forEach((droid) => {
  if (droid.friends) {
    droid.friends.bind(droid);
    droid.appearsIn.bind(droid);
  }
})

/**
 * These are Flow types which correspond to the schema.
 * They represent the shape of the data visited during field resolution.
 */
type Character = {
  id: string,
  name: string,
  friendsData: Array<string>,
  appearsIn: Array<number>,
  ...
};

type Human = {|
  type: 'Human',
  id: string,
  name: string,
  friendsData: Array<string>,
  appearsIn: Array<number>,
  homePlanet: string,
|};

type Droid = {|
  type: 'Droid',
  id: string,
  name: string,
  friendsData: Array<string>,
  appearsIn: Array<number>,
  primaryFunction: string,
|};

/**
 * Helper function to get a character by ID.
 */
function getCharacter(id) {
  // Returning a promise just to illustrate GraphQL.js's support.
  return Promise.resolve(humanData[id] || droidData[id]);
}

/**
 * Allows us to query for a character's friends.
 */
function getFriends(): Array<Promise<Character>> {
  // Notice that GraphQL accepts Arrays of Promises.
  return this.friendsData.map(id => getCharacter(id));
}

/**
 * Allows us to fetch the undisputed hero of the Star Wars trilogy, R2-D2.
 */
function getHero({ episode }): Character {
  if (episode === 'EMPIRE') {
    // Luke is the hero of Episode V.
    return luke;
  }
  // Artoo is the hero otherwise.
  return artoo;
}

/**
 * Allows us to query for the human with the given id.
 */
function getHuman({ id }): Human {
  return humanData[id];
}

/**
 * Allows us to query for the droid with the given id.
 */
function getDroid({ id }): Droid {
  return droidData[id];
}

function getSecretBackStory() {
  throw new Error('secretBackstory is secret.');
}

function getEpisodes() {
  return this.appearsInData.map(episode => EPISODES[episode]);
}

export const hero = getHero;
export const human = getHuman;
export const droid = getDroid;
