import SinhVien from "../models/SinhVien.js";
import TaiKhoan from "../models/TaiKhoan.js";

export const TaoSV = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }
  const ltc = new SinhVien(newTK);
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

export const getDSSVCoTK = async (req, res) => {
  try {
    const taiKhoans = await TaiKhoan.find();
    const DSSV = [];
    if (taiKhoans && taiKhoans.length > 0) {
      for (var index = 0; index < taiKhoans.length; index++) {
        const sinhVien = await getSVTheoMaSV(taiKhoans[index].MaTk).then(
          (val) => {
            if (val && Object.keys(val).length > 0)
              DSSV.push({
                MaTk: taiKhoans[index].MaTk,
                HoTen: val[0].HoTen,
                TenTaiKhoan: taiKhoans[index].TenTaiKhoan,
                MatKhau: taiKhoans[index].MatKhau,
              });
          }
        );
        if (index === taiKhoans.length - 1) return res.status(200).json(DSSV);
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};

export const getDSSVCoTKTheoMaLop = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }
  const { MaLop } = newTK;
  try {
    const taiKhoans = await TaiKhoan.find();
    const DSSV = [];
    if (taiKhoans && taiKhoans.length > 0) {
      for (var index = 0; index < taiKhoans.length; index++) {
        const sinhVien = await getSVTheoMaSVMaLop(
          taiKhoans[index].MaTk,
          MaLop
        ).then((val) => {
          if (val && Object.keys(val).length > 0)
            DSSV.push({
              MaTk: taiKhoans[index].MaTk,
              HoTen: val[0].HoTen,
              TenTaiKhoan: taiKhoans[index].TenTaiKhoan,
              MatKhau: taiKhoans[index].MatKhau,
            });
        });
        if (index === taiKhoans.length - 1) return res.status(200).json(DSSV);
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};

export const getDSSVChuaCoTK = async (req, res) => {
  try {
    const sinhViens = await SinhVien.find();
    const DSTK = [];
    if (sinhViens && sinhViens.length > 0) {
      for (var index = 0; index < sinhViens.length; index++) {
        const sinhVien = await getTaiKhoanTheoMaSV(sinhViens[index].MaSV).then(
          (val) => {
            if (!val || Object.keys(val).length <= 0)
              DSTK.push(sinhViens[index].MaSV);
          }
        );
        if (index === sinhViens.length - 1) return res.status(200).json(DSTK);
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};

export const getSVTheoMaSV = async (MaSV) => {
  return await SinhVien.find({ MaSV: MaSV });
};

export const getSVTheoMaSVMaLop = async (MaSV, MaLop) => {
  return await SinhVien.find({ MaSV: MaSV, MaLop: MaLop });
};

export const getTaiKhoanTheoMaSV = async (MaSV) => {
  return await TaiKhoan.find({ MaTk: MaSV });
};
