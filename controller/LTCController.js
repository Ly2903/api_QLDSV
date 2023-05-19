import Day from "../models/Day.js";
import LopTinChi from "../models/LopTinChi.js";
import MonHoc from "../models/MonHoc.js";

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
    return res
      .status(200)
      .json(ds.filter((item, index) => ds.indexOf(item) === index));
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};

export const getDSLTCTheoMaGV = async (req, res) => {
  let newTK = null;
  if (Object.keys(req.body).length) {
    newTK = req.body;
  } else if (Object.keys(req.query).length) {
    newTK = req.query;
  }
  const { MaGV, NamHoc, HocKi } = newTK;
  try {
    const dSDay = await Day.find({ MaGV: MaGV });
    const DSLTC = [];
    if (dSDay && dSDay.length > 0) {
      for (var index = 0; index < dSDay.length; index++) {
        console.log(dSDay[index].MaLTC);
        const ltc = await getLTCTheoMaLTC(
          dSDay[index].MaLTC,
          NamHoc,
          HocKi
        ).then((val) => {
          if (val && val.length > 0) {
            DSLTC.push({
              MaLTC: val[0].MaLTC,
              MaMH: val[0].MaMH,
            });
          }
        });
        if (index === dSDay.length - 1) {
          console.log(DSLTC);
          let result = [];
          if (DSLTC.length == 0) return res.status(200).json(result);
          else {
            for (var index1 = 0; index1 < DSLTC.length; index1++) {
              await getTenMHTheoMaMH(DSLTC[index1].MaMH).then((val1) => {
                if (val1 && val1.length > 0) {
                  result.push({
                    MaLTC: DSLTC[index1].MaLTC,
                    TenMH: val1[0].TenMH,
                  });
                }
                if (index1 === DSLTC.length - 1) {
                  return res.status(200).json(result);
                }
              });
            }
          }
        }
      }
    } else return res.status(200).json([]);
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Thất bại!",
    });
  }
};

export const getLTCTheoMaLTC = async (MaLTC, NamHoc, HocKi) => {
  if (NamHoc != "All" && HocKi != "All")
    return await LopTinChi.find({ MaLTC: MaLTC, NamHoc: NamHoc, HocKi: HocKi });
  else if (NamHoc != "All" && HocKi == "All")
    return await LopTinChi.find({ MaLTC: MaLTC, NamHoc: NamHoc });
  else if (HocKi != "All" && NamHoc == "All")
    return await LopTinChi.find({ MaLTC: MaLTC, HocKi: HocKi });
  else return await LopTinChi.find({ MaLTC: MaLTC });
};

export const getTenMHTheoMaMH = async (MaMH) => {
  return await MonHoc.find({ MaMH: MaMH });
};
