const newLinkSubscribe = (parent, args, context) => {
  return context.prisma.$subscribe.link({
    mutation_in: [ 'CREATED' ]
  }).node();
};

const newVoteSubscriber = (parent, args, context) => {
  return context.prisma.$subscribe.vote({
    mutation_in: [ 'CREATED' ]
  }).node();
};

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: payload => {
    return payload;
  },
};

const newVote = {
  subscribe: newVoteSubscriber,
  resolve: payload => {
    return payload;
  }
};

module.exports = {
  newLink,
  newVote,
};
