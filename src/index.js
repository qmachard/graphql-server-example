const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query: {
    info: () => 'Hello World!',
    feed: (root, args, context) => {
      return context.prisma.links();
    },
  },
  Mutation: {
    addLink: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      })
    },
    updateLink: (root, args, context) => {
      return context.prisma.updateLink({
        data: {
          description: args.description,
          url: args.url,
        },
        where: {
          id: args.id,
        }
      });
    },
    deleteLink: (parent, args, context) => {
      return context.prisma.deleteLink({
        id: args.id,
      });
    }
  },
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url,
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
});

server.start(() => console.log('Server is running on http://localhost:4000'));
