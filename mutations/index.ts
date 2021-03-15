import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import addToCart from './addToCart'
import checkout from './checkout'

/**
    type definitions: what is the name of the method 
    what args does it take
    what does it return 

    resolvers: links to node js functions that run 
    when the typedefs are requested
*/

const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
typeDefs: graphql`
type Mutation {
    addToCart(productId: ID): CartItem
    checkout(token: String!): Order
}
`,
resolvers: {
    Mutation: {
        addToCart,
        checkout
        }
    },
})
