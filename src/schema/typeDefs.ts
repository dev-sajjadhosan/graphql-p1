import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createAt: String!
    author: User!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
    users: [User!]!
    user(id: ID!): User
  }

  input PostInput {
    title: String!
    content: String!
    authorId: ID!
  }

  input UserInput {
    name: String!
    email: String!
  }

  type Mutation {
    createUser(input: UserInput!): User!
    createPost(input: PostInput!): Post!
    updatePost(id: ID!, input: PostInput!): Post!
    deletePost(id: ID!): Boolean!
  }
`

export default typeDefs
