import TaiKhoan from "../models/TaiKhoan.js";

export const TaoTaiKhoan = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }
  const taiKhoan = new TaiKhoan(newTK);
  try {
    await taiKhoan.save();
    return res.json({
      success: true,
      message: "Tạo tài khoản thành công",
    });
  } catch (error) {
    console.log("error", error);
    if (error.code == 11000) {
      return res.json({
        success: false,
        message: "Tên tài khoản bị trùng!",
      });
    }

    return res.json({
      success: false,
      message: "Lỗi khi tạo tài khoản!",
    });
  }
};

//all tài khoản
export const getDSTaiKhoan = async (req, res) => {
  try {
    const taiKhoans = await TaiKhoan.find();
    return res.status(200).json({
      success: true,
      message: "Lây danh sách tài khoản thành công!",
      taiKhoans,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};
//danh sách lớp
//danh sách mã sinh viên chưa có tài khoản
//danh sách sinh vien chưa có tài khoản
