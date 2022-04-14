const router = require("express").Router();
const controller = require("../controllers/category");
const helper = require("../ulti/helper");
const DB = require("../models/category");
const {
  validateToken,
  validateRole,
  validateBody,
  validateUnique,
  validateParams,
} = require("../ulti/validator");
const { schemaBody, schemaParams } = require("../ulti/joiSchema");

router
  .route("/")
  .get(controller.all)
  .post(
    validateToken(),
    validateRole("admin"),
    validateBody(schemaBody.category.body),
    validateUnique(DB, "name"),
    controller.add
  );

router
  .route("/:id")
  .get(validateParams(schemaParams.id, "id"), controller.get)
  .patch(
    validateParams(schemaParams.id, "id"),
    validateUnique(DB, "name"),
    validateToken(),
    validateRole("admin"),
    validateBody(schemaBody.category.patch),
    controller.patch
  )
  .delete(
    validateParams(schemaParams.id, "id"),
    validateToken(),
    validateRole("admin"),
    controller.drop
  );

module.exports = router;
