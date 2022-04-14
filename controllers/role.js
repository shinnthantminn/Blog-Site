const helper = require("../ulti/helper");
const permitDB = require("../models/permit");
const DB = require("../models/role");

module.exports = {
  all: async (req, res, next) => {
    const role = await DB.find().populate("permit", "-__v");
    helper.fMsg(res, "all role from server", role);
  },
  add: async (req, res, next) => {
    await new DB(req.body).save();
    const role = await DB.find().populate("permit", "-__v");
    helper.fMsg(res, "add role to server", role);
  },
  get: async (req, res, next) => {
    const role = await DB.findById(req.params.id).populate("permit", "-__v");
    role
      ? helper.fMsg(res, "this role is correct", role)
      : next(new Error("no role with that id"));
  },
  patch: async (req, res, next) => {
    const role = await DB.findById(req.params.id).populate("permit", "-__v");
    if (role) {
      await DB.findByIdAndUpdate(role._id, req.body);
      const updateRole = await DB.findById(role._id);
      helper.fMsg(res, "role update complete", updateRole);
    } else next(new Error("no role with that id"));
  },
  drop: async (req, res, next) => {
    const role = await DB.findById(req.params.id);
    if (role) {
      await DB.findByIdAndDelete(role._id);
      const updateRole = await DB.find().populate("permit", "-__v");
      helper.fMsg(res, "role delete complete", updateRole);
    } else next(new Error("no role with that id"));
  },
  addPermit: async (req, res, next) => {
    const roleId = await DB.findById(req.body.roleId);
    const permitId = await permitDB.findById(req.body.permitId);
    if (roleId && permitId) {
      const check = roleId.permit.find((i) => i.equals(permitId._id));
      if (check) {
        next(new Error("this permit was existing in our server"));
      } else {
        await DB.findByIdAndUpdate(roleId._id, {
          $push: { permit: permitId._id },
        });
        const role = await DB.findById(roleId._id).populate("permit", "-__v");
        helper.fMsg(res, "permit add complete", role);
      }
    } else next(new Error("something was wrong "));
  },
  removePermit: async (req, res, next) => {
    const roleId = await DB.findById(req.body.roleId);
    if (roleId) {
      await DB.findByIdAndUpdate(roleId._id, {
        $pull: { permit: req.body.permitId },
      });
      const role = await DB.find().populate("permit", "-__v");
      helper.fMsg(res, "permit remove complete", role);
    } else next(new Error("no role found"));
  },
};
