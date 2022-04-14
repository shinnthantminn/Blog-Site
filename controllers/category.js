const DB = require("../models/category");
const helper = require("../ulti/helper");

module.exports = {
  all: async (req, res, next) => {
    const category = await DB.find();
    helper.fMsg(res, "all category from server", category);
  },
  add: async (req, res, next) => {
    await new DB(req.body).save();
    const category = await DB.find();
    helper.fMsg(res, "add category to server", category);
  },
  get: async (req, res, next) => {
    const category = await DB.findById(req.params.id);
    category
      ? helper.fMsg(res, "single category from server", category)
      : next(new Error("no category with that id"));
  },
  patch: async (req, res, next) => {
    const category = await DB.findById(req.params.id);
    if (category) {
      await DB.findByIdAndUpdate(category._id, req.body);
      const newCategory = await DB.findById(req.params.id);
      helper.fMsg(res, "update category to server", newCategory);
    } else next(new Error("no category with that id"));
  },
  drop: async (req, res, next) => {
    const category = await DB.findById(req.params.id);
    if (category) {
      await DB.findByIdAndDelete(category._id);
      helper.fMsg(res, "delete category to server");
    } else next(new Error("no category with that id"));
  },
};
