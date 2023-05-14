import mongoose from "mongoose";
import { Schema } from "mongoose";

const DangKi = new Schema(
  {
    MaLTC: String,
    MaSV: String,
    DiemCC: Number,
    DiemGK: Number,
    DiemCK: Number,
    Huy: Boolean,
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

export default mongoose.model("DangKi", DangKi);
