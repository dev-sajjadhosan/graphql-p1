import Post, { IPost } from '../models/Post'

const resolvers = {
  Query: {
    posts: async (): Promise<IPost[]> => await Post.find(),
    post: async (_: unknown, { id }: { id: string }): Promise<IPost | null> =>
      await Post.findById(id),
  },
  Mutation: {
    createPost: async (
      _: unknown,
      { input }: { input: { title: string; content: string } },
    ): Promise<IPost | null> => {
      const post = new Post(input)
      return await post.save()
    },
    updatePost: async (
      _: unknown,
      { id, input }: { id: string; input: { title: string; content: string } },
    ): Promise<IPost | null> => {
      return await Post.findByIdAndUpdate(id, input, { new: true })
    },
    deletePost: async (
      _: unknown,
      { id }: { id: string },
    ): Promise<boolean> => {
      const res = await Post.findByIdAndDelete(id)
      return !!res
    },
  },
}

export default resolvers