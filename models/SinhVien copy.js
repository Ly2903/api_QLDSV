import mongoose from "mongoose";
import { Schema } from "mongoose";

const SinhVien = new Schema(
  {
    MaSV: String,
    HoTen: String,
    Phai: Boolean,
    NgaySinh: Date,
    DiaChi: String,
    KhoaHoc: String,
    TrangThaiNghi: Boolean,
    MaCN: String,
    MaLop: String,
    HinhAnh: String,
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

export default mongoose.model("SinhVien", SinhVien);
