// create a new express server
const express = require("express");
const cors = require("cors");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const data = {
  warriors: [
    { id: 1, name: "Stephen Curry", team: "Golden State Warriors" },
    { id: 2, name: "Klay Thompson", team: "Golden State Warriors" },
    { id: 3, name: "Kevin Durant", team: "Brooklyn Nets" },
    { id: 4, name: "James Harden", team: "Brooklyn Nets" },
    { id: 5, name: "Kyrie Irving", team: "Brooklyn Nets" },
    { id: 6, name: "LeBron James", team: "Los Angeles Lakers" },
    { id: 7, name: "Anthony Davis", team: "Los Angeles Lakers" },
    { id: 8, name: "Damian Lillard", team: "Portland Trail Blazers" },
  ],
};

// GraphQL schema
const typeDefs = `
type Warrior { 
    id: ID!
    name: String!
}

type Query {
    warriors: [Warrior]
}
`;

const resolvers = {
  Query: {
    warriors: (obj, args, context) => context.warriors,
  },
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    context: data,
    graphiql: true,
  })
);

const port = 4000;

//app.use('/graphql');

app.listen(port, () => console.log(`Server listening on port ${port}!`));
