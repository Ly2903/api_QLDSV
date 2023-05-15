import DangKi from "../models/DangKi.js";
import Day from "../models/Day.js";
import SinhVien from "../models/SinhVien.js";

export const TaoDangKi = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }
  const ltc = new DangKi(newTK);
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

export const getDSSVTheoMaLTC = async (req, res) => {
  let body = null;
  if (Object.keys(req.body).length) {
    body = req.body;
  } else if (Object.keys(req.query).length) {
    body = req.query;
  }
  const { MaLTC } = body;
  try {
    const DSSV = await DangKi.find({ MaLTC: MaLTC });
    return res.status(200).json({
      success: true,
      message: "Lây danh sách sinh viên theo mã lớp tín chỉ thành công!",
      DSSV,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};

export const getSVTheoMaSVAndMaLTC = async (req, res) => {
  let body = null;
  if (Object.keys(req.body).length) {
    body = req.body;
  } else if (Object.keys(req.query).length) {
    body = req.query;
  }
  const { MaLTC, MaSV } = body;
  try {
    const sinhVien = await DangKi.findOne({ MaLTC: MaLTC, MaSV: MaSV });
    return res.status(200).json({
      success: true,
      message: "Lây danh sách sinh viên theo mã lớp tín chỉ thành công!",
      sinhVien,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};

export const capNhatDiem = async (req, res) => {
  let body = null;
  if (Object.keys(req.body).length) {
    body = req.body;
  } else if (Object.keys(req.query).length) {
    body = req.query;
  }
  const { MaLTC, MaSV, DiemCC, DiemGK, DiemCK } = body;
  try {
    const sinhVien = await DangKi.findOneAndUpdate(
      { MaLTC, MaSV },
      {
        DiemCC: DiemCC,
        DiemGK: DiemGK,
        DiemCK: DiemCK,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Cập nhật điểm cho sinh viên " + MaSV + " thành công!",
      sinhVien: await DangKi.find({ MaSV, MaLTC }),
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Lỗi khi cập nhật điểm!",
    });
  }
};
