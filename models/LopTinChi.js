import mongoose from "mongoose";
import { Schema } from "mongoose";

const LopTinChi = new Schema(
  {
    MaLTC: String,
    NamHoc: String,
    HocKi: String,
    SLToiThieu: Number,
    SLToiDa: Number,
    NgayBD: Date,
    NgayKT: Date,
    MaMH: String,
    TenMH: String,
    slconlai: Number,
    TrangThai: Boolean,
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

export default mongoose.model("LopTinChi", LopTinChi);
