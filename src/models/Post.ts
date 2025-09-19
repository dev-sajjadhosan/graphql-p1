import mongoose, { Document, Schema } from 'mongoose'
import { IUser } from './User'

export interface IPost extends Document {
  title: string
  content: string
  createAt: Date
  author: Schema.Types.ObjectId
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    createAt: { type: String, default: () => new Date().toISOString() },
    author: { type: Schema.Types.ObjectId, ref: 'User', require: true },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IPost>('Post', PostSchema)
