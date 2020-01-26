const feed = (root, args, context) => {
  return context.prisma.links();
};

const allUsers = (root, args, context) => {
  return context.prisma.users();
};

module.exports = {
  feed,
  allUsers,
};
