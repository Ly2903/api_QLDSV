import GiangVien from "../models/GiangVien.js";
import LopTinChi from "../models/LopTinChi.js";

export const TaoGV = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }
  const ltc = new GiangVien(newTK);
  try {
    await ltc.save();

    return res.json({
      success: true,
      message: "Tạo lớp tín chỉ thành công",
    });
  } catch (error) {
    console.log("error", error);
    if (error.code == 11000) {
      return res.json({
        success: false,
        message: "Tên lớp tín chỉ bị trùng!",
      });
    }

    return res.json({
      success: false,
      message: "Lỗi khi tạo lớp tín chỉ!",
    });
  }
};

export const getTTGVTheoMaGV = async (req, res) => {
  let body = null;
  if (Object.keys(req.body).length) {
    body = req.body;
  } else if (Object.keys(req.query).length) {
    body = req.query;
  }
  const { MaGV } = body;
  try {
    const giangVien = await GiangVien.find({ MaGV: MaGV });
    return res.status(200).json(giangVien[0].HoTen);
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};
