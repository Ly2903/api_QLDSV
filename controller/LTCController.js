import Day from "../models/Day.js";
import LopTinChi from "../models/LopTinChi.js";

export const getDSLTC = async (req, res) => {
  try {
    const DSLTC = await LopTinChi.find();
    return res.status(200).json({
      success: true,
      message: "Lây danh sách lớp tín chỉ thành công!",
      DSLTC,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};

export const TaoLTC = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }
  const ltc = new LopTinChi(newTK);
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

export const getDSNamHocTheoLTC = async (req, res) => {
  try {
    let ds = await LopTinChi.find();
    ///parseInt("2018-2019".substring(0,4))
    ds = ds.map((val) => val.NamHoc);
    ds.sort();
    return res.status(200).json(ds);
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};
