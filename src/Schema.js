const { gql } = require("apollo-server");

const typeDefs = gql`
  type Person {
    id: ID!
    name: String!
  }

  type Song {
    id: ID!
    title: String!
    performer: Person
    writer: Person
  }

  type Query {
    ping: String!
    someSongs: [Song!]!
  }
`;

module.exports = {
  typeDefs,
};
