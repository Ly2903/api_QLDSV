import mongoose from "mongoose";
import { Schema } from "mongoose";

const TaiKhoan = new Schema(
  {
    MaTk: String,
    TenTaiKhoan: {
      type: String,
      unique: true,
    },
    MatKhau: String,
    MaVaitro: String,
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

export default mongoose.model("TaiKhoan", TaiKhoan);
