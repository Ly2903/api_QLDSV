import User from "../models/User.js";
import JWT from "jsonwebtoken";
import { secret_key } from "../config/index.js";

export const sendInvitations = async (req, res) => {
  const { id } = req.params;
  let newFriend = null;
  if (Object.keys(req.body).length) {
    newFriend = req.body;
  } else if (Object.keys(req.query).length) {
    newFriend = req.query;
  }

  try {
    const user = await User.findById(id);
    const friends = await User.findById(newFriend.idNewFriends);

    const newListINvitations = [...user.sendInvitations];
    const newListRequests = [...friends.requests];

    newListINvitations.push(newFriend.idNewFriends);
    const updateUser = await User.findByIdAndUpdate(id, {
      sendInvitations: newListINvitations,
    });

    newListRequests.push(id);
    const updateFriends = await User.findByIdAndUpdate(newFriend.idNewFriends, {
      requests: newListRequests,
    });

    return res.json({
      success: true,
      message: "Gửi lời mời kết bạn thành công",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Lỗi khi thêm bạn bè!",
    });
  }
};

export const getSuggestions = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorization",
    });
  }
  try {
    const { user: check } = await JWT.verify(token, secret_key);

    const users = await User.find();
    if (check) {
      const user = await User.findById(check._id.toString());
      const suggestions = users.filter((val) => {
        const id = val._id.toString();
        //trừ user đang xem gợi ý
        if (val.email != user.email) {
          //nếu đã là bạn bè
          if (!user.friends.includes(id)) {
            //nếu đã gửi lời mời
            if (!user.sendInvitations.includes(id)) {
              //nếu chưa đồng ý lời mời
              if (!user.requests.includes(id)) {
                return val;
              }
            }
          }
        }
      });
      return res.status(200).json({
        success: true,
        message: "Get suggestions successfully!",
        suggestions,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Get suggestions fail!",
    });
  }
};

export const getSentInv = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorization",
    });
  }
  try {
    const { user: check } = await JWT.verify(token, secret_key);

    const users = await User.find();
    if (check) {
      const user = await User.findById(check._id.toString());
      const sentInvitations = users.filter((val) => {
        const id = val._id.toString();
        if (user.sendInvitations.includes(id)) return val;
      });
      return res.status(200).json({
        success: true,
        message: "Get sent invitations successfully!",
        sentInvitations,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Get invitations fail!",
    });
  }
};

export const getRequests = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorization",
    });
  }
  try {
    const { user: check } = await JWT.verify(token, secret_key);

    const users = await User.find();
    if (check) {
      const user = await User.findById(check._id.toString());
      const requests = users.filter((val) => {
        const id = val._id.toString();
        if (user.requests.includes(id)) return val;
      });
      return res.status(200).json({
        success: true,
        message: "Get requests successfully!",
        requests,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Get requests fail!",
    });
  }
};

export const getList = async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorization",
    });
  }
  try {
    const { user: check } = await JWT.verify(token, secret_key);

    const users = await User.find();
    if (check) {
      const user = await User.findById(check._id.toString());
      const list = users.filter((val) => {
        const id = val._id.toString();
        if (user.friends.includes(id)) return val;
      });
      return res.status(200).json({
        success: true,
        message: "Get list successfully!",
        list,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Get list fail!",
    });
  }
};

export const accInvitations = async (req, res) => {
  const { id } = req.params;
  let newFriend = null;
  if (Object.keys(req.body).length) {
    newFriend = req.body;
  } else if (Object.keys(req.query).length) {
    newFriend = req.query;
  }

  try {
    const user = await User.findById(id);
    const friends = await User.findById(newFriend.idNewFriends);

    const newRequests = [...user.requests];
    const newINvitations = [...friends.sendInvitations];

    const listFriends = [...user.friends];
    const newListFriends = [...friends.friends];

    //xóa lời mời được nhận
    newRequests.splice(
      newRequests.findIndex((val) => val === newFriend.idNewFriends),
      1
    );

    //xóa lời mời đã gửi
    newINvitations.splice(
      newINvitations.findIndex((val) => val === user),
      1
    );

    //thêm bạn
    listFriends.push(newFriend.idNewFriends);
    newListFriends.push(id);

    const updateUser = await User.findByIdAndUpdate(id, {
      requests: newRequests,
      friends: listFriends,
    });

    const updateFriends = await User.findByIdAndUpdate(newFriend.idNewFriends, {
      sendInvitations: newINvitations,
      friends: newListFriends,
    });
    return res.json({
      success: true,
      message: "Hai bạn đã trở thành bạn bè!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Lỗi khi thêm bạn bè!",
    });
  }
};
