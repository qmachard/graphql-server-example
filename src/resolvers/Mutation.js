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

const updateLink = (root, args, context) => {
  // TODO: Update link can be possible only by user who has posted
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
  // TODO: Delete link can be possible only by user who has posted
  return context.prisma.deleteLink({
    id: args.id,
  });
};

const signup = async (parent, args, context) => {
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

module.exports = {
  addLink,
  updateLink,
  deleteLink,
  signup,
  login,
};
