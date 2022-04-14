const DB = require("../models/admin");
const roleDB = require("../models/role");
const permitDB = require("../models/permit");
const helper = require("../ulti/helper");
module.exports = {
  all: async (req, res, next) => {
    const admin = await DB.find().populate("role permit", "-__v ");
    console.log(admin);
    helper.fMsg(res, "all admin from server", admin);
  },
  createAdmin: async (req, res, next) => {
    req.body.password = helper.encode(req.body.password);
    await new DB(req.body).save();
    const admin = await DB.find().populate("role permit", "-__v ");
    helper.fMsg(res, "create admin to server", admin);
  },
  login: async (req, res, next) => {
    const admin = await DB.findOne({ email: req.body.email }).populate(
      "role permit",
      "-__v"
    );
    if (admin) {
      if (helper.compare(req.body.password, admin.password)) {
        const realAdmin = admin.toObject();
        delete realAdmin.password;
        realAdmin.token = helper.token(realAdmin);
        await helper.set(realAdmin._id, realAdmin);
        helper.fMsg(res, "login successfully", realAdmin);
      } else next(new Error("password wrong"));
    } else next(new Error("no admin with that email"));
  },
  get: async (req, res, next) => {
    const admin = await DB.findById(req.params.id);
    admin
      ? helper.fMsg(res, "single get by id", admin)
      : next(new Error("no admin with that id"));
  },
  drop: async (req, res, next) => {
    const admin = await DB.findById(req.params.id);
    if (admin) {
      await DB.findByIdAndDelete(admin._id);
      helper.fMsg(res, "delete admin complete");
    } else next(new Error("no admin with that id"));
  },
  addRole: async (req, res, next) => {
    const adminId = await DB.findById(req.body.adminId);
    const roleId = await roleDB.findById(req.body.roleId);

    if (adminId && roleId) {
      const check = adminId.role.find((i) => i.equals(roleId._id));
      if (check) {
        next(new Error("this role was existing in this admin"));
      } else {
        await DB.findByIdAndUpdate(adminId._id, {
          $push: { role: roleId._id },
        });
        const newAdmin = await DB.findById(adminId._id).populate(
          "role permit",
          "-__v"
        );
        helper.fMsg(res, "role add complete", newAdmin);
      }
    } else next(new Error("something wrong"));
  },
  removeRole: async (req, res, next) => {
    const adminId = await DB.findById(req.body.adminId);
    if (adminId) {
      await DB.findByIdAndUpdate(adminId._id, {
        $pull: { role: req.body.roleId },
      });
      helper.fMsg(res, "role remove complete");
    } else next(new Error("not admin found"));
  },
  addPermit: async (req, res, next) => {
    const adminId = await DB.findById(req.body.adminId);
    const permitId = await permitDB.findById(req.body.permitId);

    if (adminId && permitId) {
      const check = adminId.permit.find((i) => i.equals(permitId._id));
      if (check) {
        next(new Error("this permit was existing in this admin"));
      } else {
        await DB.findByIdAndUpdate(adminId._id, {
          $push: { permit: permitId._id },
        });
        const newAdmin = await DB.findById(adminId._id).populate(
          "role permit",
          "-__v"
        );
        helper.fMsg(res, "permit add complete", newAdmin);
      }
    } else next(new Error("something wrong"));
  },
  removePermit: async (req, res, next) => {
    const adminId = await DB.findById(req.body.adminId);
    if (adminId) {
      await DB.findByIdAndUpdate(adminId._id, {
        $pull: { permit: req.body.permitId },
      });
      helper.fMsg(res, "permit remove complete");
    } else next(new Error("not admin found"));
  },
};
