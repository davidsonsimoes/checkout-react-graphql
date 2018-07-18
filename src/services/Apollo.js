import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
    uri: `https://api.graph.cool/simple/v1/cjjq83wmy34ig01549x4mu3pe`
  });

// Fetch GraphQL data with plain JS
client
  .query({
    query: gql`
      {
        allProducts {
            id
            name
            price
        }
      }
    `
  })
  .then(({ data }) => console.log({ data }));

export default client;