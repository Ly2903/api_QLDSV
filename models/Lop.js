import mongoose from "mongoose";
import { Schema } from "mongoose";

const Lop = new Schema(
  {
    MaLop: String,
    TenLop: {
      type: String,
      unique: true,
    },
    ArrSinhVien: Array,
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

export default mongoose.model("Lop", Lop);
