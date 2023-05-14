import mongoose from "mongoose";
import { Schema } from "mongoose";

const Day = new Schema(
  {
    MaGV: String,
    MaLTC: String,
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

export default mongoose.model("Day", Day);
