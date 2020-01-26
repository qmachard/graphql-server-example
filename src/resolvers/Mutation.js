const addLink = (root, args, context) => {
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
  })
};

const updateLink = (root, args, context) => {
  return context.prisma.updateLink({
    data: {
      description: args.description,
      url: args.url,
    },
    where: {
      id: args.id,
    }
  });
};

const deleteLink = (parent, args, context) => {
  return context.prisma.deleteLink({
    id: args.id,
  });
};

module.exports = {
  addLink,
  updateLink,
  deleteLink,
};
