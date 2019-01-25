import mongoose from 'mongoose'
const Schema = mongoose.Schema

export default mongoose.model('User', new Schema({
  username: {type: String, unique: true, required: true},
  password: String,
  sex: {type: String, enum: ['MAN', 'WOMAN', 'OTHER']}
}))
