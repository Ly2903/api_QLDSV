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
    // return res.status(200).json({
    //   success: true,
    //   message: "Lây danh sách tài khoản thành công!",
    //   taiKhoans,
    // });
    return res.status(200).json(taiKhoans);
  } catch (error) {
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};

export const getTKTheoMaTK = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }

  const { MaTk } = newTK;
  try {
    const tk = await TaiKhoan.find({ MaTk: MaTk }).then((val) => {
      console.log("cann: ", val);
      if (val && Object.keys(val).length > 0)
        return res.json({
          MaTk: val[0].MaTk,
          TenTaiKhoan: val[0].TenTaiKhoan,
          MatKhau: val[0].MatKhau,
        });
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

export const suaTaiKhoan = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }
  const { MaTk, TenTaiKhoan, MatKhau } = newTK;

  try {
    const taiKhoan = await TaiKhoan.findOneAndUpdate(
      { MaTk: MaTk },
      {
        TenTaiKhoan: TenTaiKhoan,
        MatKhau: MatKhau,
      }
    );
    if (taiKhoan && Object.keys(taiKhoan).length > 0)
      return res.json({
        success: true,
        message: "Sửa tài khoản thành công",
      });
    else
      return res.json({
        success: false,
        message: "Tài khoản chưa tồn tại!",
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
      message: "Lỗi khi sửa tài khoản!",
    });
  }
};

export const XoaTaiKhoan = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }
  const { MaTk, TenTaiKhoan, MatKhau } = newTK;

  try {
    const taiKhoan = await TaiKhoan.findOneAndDelete({ MaTk: MaTk });
    if (taiKhoan && Object.keys(taiKhoan).length > 0)
      return res.json({
        success: true,
        message: "Xóa tài khoản thành công",
      });
    else
      return res.json({
        success: false,
        message: "Tài khoản chưa tồn tại!",
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
      message: "Lỗi khi sửa tài khoản!",
    });
  }
};

//danh sách lớp
//danh sách mã sinh viên chưa có tài khoản
//danh sách sinh vien chưa có tài khoản
