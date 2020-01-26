const id = parent => parent.id;

const description = parent => parent.description;

const url = parent => parent.url;

const postedBy = (parent, args, context) => {
  return context.prisma.link({
    id: parent.id,
  }).postedBy();
};

const votes = (parent, args, context) => {
  return context.prisma.link({
    id: parent.id,
  }).votes();
};

module.exports = {
  id,
  description,
  url,
  postedBy,
  votes,
};
