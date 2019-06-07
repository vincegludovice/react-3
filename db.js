const faker = require('faker');

const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

module.exports = () => {
  return {
    posts: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      text: faker.lorem.sentence(),
      date: new Date(faker.date.past()).toLocaleString('en-US', dateOptions),
    })),
  };
};
