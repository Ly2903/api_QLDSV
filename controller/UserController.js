// import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import JWT from "jsonwebtoken";
// import { secret_key } from "../config/index.js";
// import Post from "../models/Post.js";

// export const register = async (req, res) => {
//   try {
//     let getUser = null;
//     if (Object.keys(req.body).length) {
//       getUser = req.body;
//     } else if (Object.keys(req.query).length) {
//       getUser = req.query;
//     }

//     const salt = await bcrypt.genSaltSync(12);
//     const hashPw = bcrypt.hashSync(getUser.password, salt);
//     getUser.password = hashPw;
//     const user = new User(getUser);
//     await user.save();
//     return res.json({
//       success: true,
//       message: "Đăng ký tài khoản thành công",
//     });
//   } catch (error) {
//     if (error.code == 11000) {
//       return res.json({
//         success: false,
//         message: "Tài khoản đã tồn tại",
//       });
//     }
//     return res.json({
//       success: false,
//       message: "Đăng ký tài khoản không thành công",
//     });
//   }
// };
// export const login = async (req, res) => {
//   let getUser = null;
//   try {
//     if (Object.keys(req.body).length) {
//       getUser = req.body;
//     } else if (Object.keys(req.query).length) {
//       getUser = req.query;
//     }
//     if (!getUser) {
//       return res.json({
//         success: false,
//         message: "Email hoặc password không được bỏ trống",
//       });
//     }
//     const { email, password } = getUser;
//     if (!email || !password) {
//       return res.json({
//         success: false,
//         message: "Email hoặc password không được bỏ trống",
//       });
//     }
//     const user = await User.findOne({ email });
//     if (user) {
//       const isMatch = await bcrypt.compareSync(password, user.password);
//       if (isMatch) {
//         delete user.password;
//         //generate token
//         const token = await JWT.sign({ user }, secret_key, {
//           expiresIn: "1d",
//         });
//         return res.json({
//           success: true,
//           message: "Đăng nhập thành công",
//           user,
//           token,
//         });
//       }
//       return res.json({
//         success: false,
//         message: "Mật khẩu không hợp lệ",
//       });
//     } else {
//       return res.json({
//         success: false,
//         message: "Tài khoản chưa tồn tại",
//       });
//     }
//   } catch (error) {
//     console.log("error", error);
//   }
// };
// export const getUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     return res.status(200).json({
//       success: true,
//       message: "Get users successfully!",
//       users,
//     });
//   } catch (error) {
//     return res.json({
//       success: false,
//       message: "Get users fail!",
//     });
//   }
// };
