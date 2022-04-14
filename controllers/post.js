const DB = require("../models/post");
const helper = require("../ulti/helper");
const fs = require("fs");

module.exports = {
  all: async (req, res, next) => {
    const post = await DB.find().populate(
      "admin category",
      "-__v -email -password -permit -role"
    );
    helper.fMsg(res, "all post from server", post);
  },
  add: async (req, res, next) => {
    req.body.admin = req.admin._id;
    await new DB(req.body).save();
    const post = await DB.find().populate(
      "admin category",
      "-__v -email -password -permit -role"
    );
    helper.fMsg(res, "add post complete", post);
  },
  get: async (req, res, next) => {
    const post = await DB.findById(req.params.id).populate(
      "admin category",
      "-__v -email -password -permit -role"
    );
    post
      ? helper.fMsg(res, "single post get py permit", post)
      : next(new Error("no post with that is"));
  },
  patch: async (req, res, next) => {
    const post = await DB.findById(req.params.id);
    if (post) {
      if (req.body.image) {
        console.log(req.body.image);
        fs.unlinkSync(`./upload/post/image/${post.image}`);
      }
      await DB.findByIdAndUpdate(post._id, req.body);
      const newPost = await DB.find().populate(
        "admin category",
        "-__v -email -password -permit -role"
      );
      helper.fMsg(res, "post update complete", newPost);
    } else next(new Error("no post with that is"));
  },
  drop: async (req, res, next) => {
    const post = await DB.findById(req.params.id);
    if (post) {
      fs.unlinkSync(`./upload/post/image/${post.image}`);
      await DB.findByIdAndDelete(post._id);
      const newPost = await DB.find().populate(
        "admin category",
        "-__v -email -password -permit -role"
      );
      helper.fMsg(res, "post delete complete", newPost);
    } else next(new Error("no post with that is"));
  },
};
