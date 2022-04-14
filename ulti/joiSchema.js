const joi = require("joi");

module.exports = {
  schemaBody: {
    admin: {
      body: joi.object({
        name: joi.string().min(3).required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
      }),
      patch: joi.object({
        name: joi.string().min(3),
        email: joi.string().email(),
        password: joi.string().email(),
      }),
      login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
      }),
      role: joi.object({
        adminId: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        roleId: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
      }),
      permit: joi.object({
        adminId: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        permitId: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
      }),
    },
    role: {
      body: joi.object({
        name: joi.string().required(),
      }),
      patch: joi.object({
        name: joi.string(),
      }),
      permit: joi.object({
        roleId: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
        permitId: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
      }),
    },
    permit: {
      body: joi.object({
        name: joi.string().min(3).required(),
      }),
      patch: joi.object({
        name: joi.string().min(3),
      }),
    },
    category: {
      body: joi.object({
        name: joi.string().min(3).required(),
      }),
      patch: joi.object({
        name: joi.string().min(3),
      }),
    },
    post: {
      body: joi.object({
        admin: joi.string().regex(/^[0-9a-fA-F]{24}$/),
        header: joi.string().required(),
        image: joi.string(),
        content: joi.string().required(),
        category: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required(),
      }),
      patch: joi.object({
        admin: joi.string().regex(/^[0-9a-fA-F]{24}$/),
        header: joi.string(),
        image: joi.string(),
        content: joi.string(),
        category: joi.string().regex(/^[0-9a-fA-F]{24}$/),
      }),
    },
  },
  schemaParams: {
    id: joi.object({
      id: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
  },
};
