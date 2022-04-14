const fs = require("fs");
const adminDB = require("../models/admin");
const roleDB = require("../models/role");
const permitDB = require("../models/permit");
const helper = require("../ulti/helper");

const addDatabase = async (db, name, data) => {
  data.map(async (i) => {
    const finder = {};
    finder[name] = i[name];
    const check = await db.findOne(finder);
    if (check === null) {
      if (i.email) {
        i.password = helper.encode(i.password);
      }
      await new db(i).save();
    }
  });
};

module.exports = {
  migrator: async () => {
    const adminData = fs.readFileSync("./migrations/Data/admin.json");
    const roleData = fs.readFileSync("./migrations/Data/role.json");
    const permitData = fs.readFileSync("./migrations/Data/permit.json");
    const admin = JSON.parse(adminData);
    const role = JSON.parse(roleData);
    const permit = JSON.parse(permitData);

    await addDatabase(adminDB, "email", admin);
    await addDatabase(roleDB, "name", role);
    await addDatabase(permitDB, "name", permit);

    const addAdmin = await adminDB.findOne({ name: "Shinn Thant Minn" });
    const AdminRole = await roleDB.findOne({ name: "admin" });

    if (addAdmin && AdminRole) {
      const check = addAdmin.role.find((i) => i.equals(AdminRole._id));
      if (!check) {
        await adminDB.findByIdAndUpdate(addAdmin._id, {
          $push: { role: AdminRole._id },
        });
      }
    }
  },
};
