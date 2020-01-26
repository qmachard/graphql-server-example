const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => 'Hello World!',
    feed: () => links,
  },
  Mutation: {
    addLink: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);

      return link;
    },
    updateLink: (parent, args) => {
      const currentLink = links.find(link => link.id === args.id);
      const index = links.indexOf(currentLink);

      if (!currentLink) {
        throw new Error('Link not found');
      }

      currentLink.description = args.description || currentLink.description;
      currentLink.url = args.url || currentLink.url;

      links = Object.assign([], links, {[index]: currentLink});

      return currentLink;
    },
    deleteLink: (parent, args) => {
      const currentLink = links.find(link => link.id === args.id);
      const index = links.indexOf(currentLink);

      if (!currentLink) {
        throw new Error('Link not found');
      }

      links.splice(index, 1);

      return currentLink;
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
});

server.start(() => console.log('Server is running on http://localhost:4000'));
