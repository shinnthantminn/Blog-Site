const bcrypt = require("bcryptjs");
const redis = require("async-redis").createClient();
const jwt = require("jsonwebtoken");

module.exports = {
  fMsg: (res, mes = "", result = []) => {
    res.status(200).json({
      con: true,
      mes,
      result,
    });
  },
  encode: (payload) => bcrypt.hashSync(payload, 10),
  compare: (plane, hash) => bcrypt.compareSync(plane, hash),
  token: (payload) =>
    jwt.sign(payload, process.env.KEY, {
      expiresIn: "1h",
    }),
  decode: (payload) => jwt.decode(payload, process.env.KEY),
  set: async (id, value) => redis.set(id.toString(), JSON.stringify(value)),
  get: async (id) => redis.get(id.toString()),
  del: async (id) => redis.del(id.toString()),
};
