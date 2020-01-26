const feed = (root, args, context) => {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter },
    ]
  } : {};

  return context.prisma.links({
    where,
  });
};

const allUsers = (root, args, context) => {
  return context.prisma.users();
};

module.exports = {
  feed,
  allUsers,
};
