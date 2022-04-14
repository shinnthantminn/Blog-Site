const helper = require("../ulti/helper");
const DB = require("../models/permit");

module.exports = {
  all: async (req, res, next) => {
    const permit = await DB.find();
    helper.fMsg(res, "all permit from server", permit);
  },
  add: async (req, res, next) => {
    await new DB(req.body).save();
    const permit = DB.find();
    helper.fMsg(res, "permit add complete", permit);
  },
  get: async (req, res, next) => {
    const permit = await DB.findById(req.params.id);
    permit
      ? helper.fMsg(res, "single permit get", permit)
      : next(new Error("no permit with that id"));
  },
  patch: async (req, res, next) => {
    const permit = await DB.findById(req.params.id);
    if (permit) {
      await DB.findByIdAndUpdate(permit._id, req.body);
      const newPermit = await DB.findById(req.params.id);
      helper.fMsg(res, "permit update complete", newPermit);
    } else next(new Error("no permit with that id"));
  },
  drop: async (req, res, next) => {
    const permit = await DB.findById(req.params.id);
    if (permit) {
      await DB.findByIdAndDelete(permit._id);
      const newPermit = await DB.find();
      helper.fMsg(res, "permit delete complete", newPermit);
    } else next(new Error("no permit with that id"));
  },
};
