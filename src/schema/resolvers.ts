import Post, { IPost } from '../models/Post'
import User, { IUser } from '../models/User'

const resolvers = {
  //  reading all data
  Query: {
    posts: async (): Promise<IPost[]> => await Post.find(),
    post: async (_: unknown, { id }: { id: string }): Promise<IPost | null> =>
      await Post.findById(id),
    users: async (): Promise<IUser[]> => await User.find(),
    user: async (_: unknown, { id }: { id: string }): Promise<IUser | null> =>
      await User.findById(id),
  },
  // writing data
  Mutation: {
    createUser: async (
      _: unknown,
      { input }: { input: { name: string; email: string } },
    ): Promise<IUser | null> => {
      const user = new User(input)
      return await user.save()
    },
    createPost: async (
      _: unknown,
      {
        input,
      }: { input: { title: string; content: string; authorId: string } },
    ): Promise<IPost | null> => {
      const user = await User.findById(input.authorId)
      if (!user) throw new Error('User not found')

      const post = new Post({
        title: input.title,
        content: input.content,
        author: input.authorId,
      })
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

  //
  User: {
    posts: async (parent: IUser) => await Post.find({ author: parent.id }),
  },
  Post: {
    author: async (parent: IPost) => await User.findById(parent.author),
  },
}

export default resolvers
