import TaiKhoan from "../models/TaiKhoan.js";

export const TaoTaiKhoan = async (req, res) => {
  let newTK = null;
  console.log(res.body);
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
      post: post,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Lỗi khi tạo tài khoản!",
    });
  }
};
