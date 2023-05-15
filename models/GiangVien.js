import mongoose from "mongoose";
import { Schema } from "mongoose";

const GiangVien = new Schema(
  {
    MaGV: String,
    HoTen: String,
    HocVi: String,
    HocHam: String,
    Phai: Boolean,
    NgaySinh: Date,
    DiaChi: String,
    ChuyenMon: String,
    TrangThaiNghi: Boolean,
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

export default mongoose.model("GiangVien", GiangVien);
