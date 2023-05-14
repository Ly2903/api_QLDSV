// import Post from "../models/Post.js";
// import JWT from "jsonwebtoken";
// import { secret_key } from "../config/index.js";
// import User from "../models/User.js";
// import { login } from "./UserController.js";

// export const createPost = async (req, res) => {
//   let newPost = null;
//   if (Object.keys(req.body).length) {
//     newPost = req.body;
//   } else if (Object.keys(req.query).length) {
//     newPost = req.query;
//   }
//   const post = new Post(newPost);
//   try {
//     await post.save();
//     return res.json({
//       success: true,
//       message: "Bài viết đã được đăng trên trang cá nhân của bạn",
//       post: post,
//     });
//   } catch (error) {
//     if (error.code == 10334) {
//       return res.json({
//         success: false,
//         message: "Dung lượng bài đăng quá tải!",
//       });
//     }
//     return res.json({
//       success: false,
//       message: "Lỗi hệ thống trong quá trình đăng tải!",
//     });
//   }
// };

// export const getPost = async (req, res) => {
//   try {
//     const id = await checkUserAndGetID(req);
//     if (id) {
//       const user = await User.findById(id);

//       let p = await Post.find({ author: user.email });
//       p = p.reverse();

//       let posts = [];
//       if (p.length === 0) {
//         return res.status(200).json({
//           success: true,
//           message: "Get posts successfully!",
//           posts,
//         });
//       }

//       for (let index = 0; index < p.length; index++) {
//         const val = p[index];

//         let val1 = JSON.parse(JSON.stringify(val));
//         val1.user = user;

//         posts.push(val1);

//         if (posts.length === p.length)
//           return res.status(200).json({
//             success: true,
//             message: "Get posts successfully!",
//             posts,
//           });
//       }
//     }
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorization",
//     });
//   }
// };

// // export const getAllPost = async (req, res) => {
// //   try {
// //     //lấy tất cả bài post
// //     let p = await Post.find();
// //     let posts = [];

// //     if (p.length === 0)
// //       return res.status(200).json({
// //         success: true,
// //         message: "Get posts successfully!",
// //         posts,
// //       });

// //     const id = await checkUserAndGetID(req);
// //     if (id) {
// //       const user = await User.findById(id);

// //       for (let index = 0; index < p.length; index++) {
// //         const val = p[index];

// //         const email = val.author;
// //         let val1 = JSON.parse(JSON.stringify(val));

// //         //chir laasy nhung bai post thuoc pham vi ban be
// //         //tìm user theo email
// //         getUserByEmail(email).then((req) => {
// //           val1.user = req;
// //           if (req.email === email) {
// //             posts.push(val1);
// //           } else if (user.friends.includes(req._id.toString())) {
// //             posts.push(val1);
// //           }
// //           if (index === p.length - 1) {
// //             posts.sort((a, b) => {
// //               return (
// //                 new Date(b.updatedAt).getTime() -
// //                 new Date(a.updatedAt).getTime()
// //               );
// //             });
// //             return res.status(200).json({
// //               success: true,
// //               message: "Get posts successfully!",
// //               posts,
// //             });
// //           }
// //         });
// //       }
// //     }
// //   } catch (error) {
// //     return res.status(400).json({
// //       success: false,
// //       message: "Get all post fail",
// //     });
// //   }
// // };
// export const getAllPost = async (req, res) => {
//   try {
//     //lấy tất cả bài post
//     let p = await Post.find();
//     let posts = [];

//     if (p.length === 0)
//       return res.status(200).json({
//         success: true,
//         message: "Get posts successfully!",
//         posts,
//       });

//     const id = await checkUserAndGetID(req);
//     if (id) {
//       const user = await User.findById(id);

//       for (let index = 0; index < p.length; index++) {
//         const val = p[index];

//         const email = val.author;
//         let val1 = JSON.parse(JSON.stringify(val));

//         //tìm user theo email
//         getUserByEmail(email).then((req) => {
//           val1.user = req;
//           posts.push(val1);

//           if (index === p.length - 1) {
//             posts.sort((a, b) => {
//               return (
//                 new Date(b.updatedAt).getTime() -
//                 new Date(a.updatedAt).getTime()
//               );
//             });
//             return res.status(200).json({
//               success: true,
//               message: "Get posts successfully!",
//               posts,
//             });
//           }
//         });
//       }
//     }
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: "Get all post fail",
//     });
//   }
// };
// const getUserByEmail = async (email) => {
//   return await User.findOne({ email });
// };

// const checkUserAndGetID = async (req) => {
//   const token = req.headers["authorization"];
//   if (!token) {
//     return "";
//   }
//   try {
//     const { user: check } = await JWT.verify(token, secret_key);
//     if (check) {
//       return check._id.toString();
//     }
//   } catch (error) {
//     return "";
//   }
//   return "";
// };
