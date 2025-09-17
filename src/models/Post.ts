import mongoose, { Document, Schema } from 'mongoose'

export interface IPost extends Document {
  title: string
  content: string
  createAt: Date
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    createAt: { type: String, default: () => new Date().toISOString() },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IPost>('Post', PostSchema)
