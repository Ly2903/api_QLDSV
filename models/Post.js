import mongoose from "mongoose";
import { Schema } from "mongoose";

const Post = new Schema(
  {
    content: {
      type: String,
      default: "",
    },
    attachments: Array,
    author: String,
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

export default mongoose.model("post", Post);
