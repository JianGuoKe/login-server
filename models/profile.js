// 用户自定义属性

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const profileSchema = new Schema({
  _id: String,
  userId: {type: String, unique: true}, 
  key: {type: String, unique: true},
  description: String,
  value: Schema.Types.Mixed,
  disabled: Boolean, 
} )

module.exports = mongoose.model("Profile", profileSchema)
