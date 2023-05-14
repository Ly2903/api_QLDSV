import DangKi from "../models/DangKi.js";
import TaiKhoan from "../models/TaiKhoan.js";

export const CapNhatDiem = async (req, res) => {
  const { DIEMCC, DIEMGK, DIEMCK, MaLTC, MaSV } = req.body;
  console.log(req.body);
  try {
    const id = DangKi.findByIdAndUpdate(MaSV, MaLTC, {
      DiemCC: DIEMCC,
      DiemGK: DIEMGK,
      DiemCC: DIEMCK,
    });
    console.log(id);
    if (id === -1) {
      return res.json({
        success: false,
        message: "Tài khoản sinh viên chưa tồn tại!",
      });
    }

    return res.json({
      success: true,
      message: "Cập nhật điểm thành công",
    });
  } catch (error) {
    console.log("e", error);
    return res.json({
      success: false,
      message: "Lỗi trong quá trình cập nhật điểm!",
    });
  }
};
