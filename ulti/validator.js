const helper = require("../ulti/helper");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else next();
    };
  },
  validateParams: (schema, name) => {
    return (req, res, next) => {
      const obj = {};
      obj[name] = req.params[name];
      const result = schema.validate(obj);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else next();
    };
  },
  validateUnique: (db, ...name) => {
    return async (req, res, next) => {
      const check = await db.find();
      if (check.length === 0) {
        next();
      } else {
        const num = [];
        name.map(async (i) => {
          const finder = {};
          finder[i] = req.body[i];
          const result = await db.findOne(finder);
          num.push(i);
          if (result) {
            next(new Error(`this ${i} was existing in our server`));
          } else next();
        });
      }
    };
  },
  validateToken: () => {
    return async (req, res, next) => {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = helper.decode(token);
        const raw = await helper.get(user._id);
        if (raw) {
          req.admin = JSON.parse(raw);
          next();
        } else next(new Error("Tokenization Error"));
      } else next(new Error("Tokenization Error"));
    };
  },
  validateRole: (...role) => {
    return (req, res, next) => {
      const adminRole = req.admin.role.map((i) => i.name);

      const check = adminRole.some((i) => role.includes(i));
      if (check) {
        next();
      } else next(new Error("you have no permission to do that"));
    };
  },
};
