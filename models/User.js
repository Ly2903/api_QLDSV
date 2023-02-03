import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Date } from "mongoose";

const User = new Schema(
  {
    lastName: String,
    firstName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    birthday: Date,
    gender: String,
    avt: String,
    friends: Array,
    requests: Array, //lời mời kết bạn
    sendInvitations: Array, //đã gửi yêu cầu
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

export default mongoose.model("user", User);
