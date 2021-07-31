const { ApolloServer } = require("apollo-server");

const { typeDefs } = require("./Schema");
const { resolvers } = require("./Resolvers");
const { context } = require("./Context");

const debug = require("debug")("demo-dataloader:root")

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url }) => {
  debug(`🚀  Server ready at ${url}`);
});
