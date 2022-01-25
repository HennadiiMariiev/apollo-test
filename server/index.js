const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./schema');
const { users } = require('./data');

const PORT = process.env.PORT || 5000;
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(cors());
app.use(morgan(formatsLogger));

const createNewUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id = 1 }) => {
    console.log(id);
    console.log(users);

    console.log(
      'here',
      users.find((user) => user.id === Number(id))
    );
    return users.find((user) => user.id === Number(id));
  },
  createUser: ({ input }) => {
    const user = createNewUser(input);
    users.push(user);
    return user;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
  })
);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
