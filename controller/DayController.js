import Day from "../models/Day.js";
import SinhVien from "../models/SinhVien.js";

export const TaoDay = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }
  const ltc = new Day(newTK);
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

export const getDSLTCTheoMaGV = async (req, res) => {
  let body = null;
  if (Object.keys(req.body).length) {
    body = req.body;
  } else if (Object.keys(req.query).length) {
    body = req.query;
  }
  const { MaGV } = body;
  try {
    const DSLTC = await Day.find({ MaGV: MaGV });
    return res.status(200).json({
      success: true,
      message: "Lây danh sách lớp tín chỉ theo mã giảng viên thành công!",
      DSLTC,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};
