// 用户自定义属性

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
  _id:{type: mongoose.Schema.ObjectId, auto: true},
  userId: { type: String, required: true },
  key: { type: String, required: true },
  description: String,
  value: Schema.Types.Mixed,
  disabled: Boolean,
})

profileSchema.index(
  {
    userId: 1,
    key: 1,
  },
  { unique: true },
)

module.exports = mongoose.model("Profile", profileSchema)
