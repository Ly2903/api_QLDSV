import mongoose from "mongoose";
import { Schema } from "mongoose";

const MonHoc = new Schema(
  {
    MaMH: String,
    TenMH: String,
    TeSoTietLTnMH: String,
    SoTietLT: Number,
    SLToiDa: Number,
    SoTinChi: Number,
    HeSoCC: Number,
    HeSoGK: Number,
    HeSoCK: Number,
    MaCN: String,
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

export default mongoose.model("MonHoc", MonHoc);
