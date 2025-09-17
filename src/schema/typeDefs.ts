import { gql } from 'apollo-server-express'

const typeDefs = gql`
    type Post {
    id: ID!
    title: String!
    content: String!
    createAt: String!
    } 

    type Query {
    posts: [Post!]!
    post(id: ID!): Post
    }

    input PostInput {
    title: String!
    content: String!
    }

    type Mutation{
    createPost(input: PostInput!): Post!
    updatePost(id: ID!, input: PostInput!): Post!
    deletePost(id: ID!): Boolean!
    }
`

export default typeDefs
