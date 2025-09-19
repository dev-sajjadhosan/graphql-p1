import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  id: string
  name: string
  email: string
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<IUser>('User', UserSchema)
