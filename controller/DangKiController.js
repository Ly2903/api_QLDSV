import DangKi from "../models/DangKi.js";
import Day from "../models/Day.js";
import LopTinChi from "../models/LopTinChi.js";
import MonHoc from "../models/MonHoc.js";
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
  const result = [];
  try {
    const dangKis = await DangKi.find({ MaLTC: MaLTC });
    for (var index = 0; index < dangKis.length; index++) {
      const ltc = await getLTCTheoMaLTC(dangKis[index].MaLTC);
      if (ltc || ltc.length > 0) {
        const mh = await getHeSoMH(ltc[0].MaMH).then((val1) => {
          if (val1 || val1.length > 0) {
            console.log(val1[0]);
            result.push({
              MaSV: dangKis[index].MaSV,
              DiemCC: dangKis[index].DiemCC,
              DiemGK: dangKis[index].DiemGK,
              DiemCK: dangKis[index].DiemCK,
              DiemTK:
                (dangKis[index].DiemCC * val1[0].HeSoCC) / 100 +
                (dangKis[index].DiemGK * val1[0].HeSoGK) / 100 +
                (dangKis[index].DiemCK * val1[0].HeSoCK) / 100,
            });
          }
        });
      }
      if (index == dangKis.length - 1) {
        return res.status(200).json(result);
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
    return res.status(200).json(sinhVien);
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

export const getHeSoMH = async (MaMH) => {
  return await MonHoc.find({ MaMH: MaMH });
};

export const getLTCTheoMaLTC = async (MaLTC) => {
  return await LopTinChi.find({ MaLTC: MaLTC });
};
