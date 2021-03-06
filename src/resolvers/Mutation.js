const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {APP_SECRET, getUserId} = require('../utils');

const addLink = (root, args, context) => {
  const userId = getUserId(context);

  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
};

const updateLink = async (root, args, context) => {
  const userId = getUserId(context);

  const link = context.prisma.link({
    id: args.id,
  });

  if (await link.postedBy().id() !== userId) {
    throw new Error('You don\'t have permission to update this link');
  }

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

const deleteLink = async (parent, args, context) => {
  const userId = getUserId(context);

  const link = context.prisma.link({
    id: args.id,
  });

  if (await link.postedBy().id() !== userId) {
    throw new Error('You don\'t have permission to update this link');
  }

  return context.prisma.deleteLink({
    id: args.id,
  });
};

const signup = async (parent, args, context) => {
  const userExists = await context.prisma.$exists.user({
    email: args.email,
  });

  if (userExists) {
    throw new Error('User already exists');
  }

  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.createUser({
    ...args,
    password,
  });

  const token = jwt.sign({
    userId: user.id,
  }, APP_SECRET);

  return {
    token,
    user,
  }
};

const login = async (parent, args, context) => {
  const user = await context.prisma.user({email: args.email});
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({
    userId: user.id
  }, APP_SECRET);

  return {
    token,
    user,
  }
};

const vote = async (parents, args, context) => {
  const userId = getUserId(context);

  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId },
  });

  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return context.prisma.createVote({
    user: { connect: { id: userId }},
    link: { connect: { id: args.linkId } },
  });
};

module.exports = {
  addLink,
  updateLink,
  deleteLink,
  signup,
  login,
  vote,
};
