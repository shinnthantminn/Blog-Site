const router = require("express").Router();
const controller = require("../controllers/permit");
const {
  validateBody,
  validateToken,
  validateRole,
  validateUnique,
  validateParams,
} = require("../ulti/validator");
const { schemaBody, schemaParams } = require("../ulti/joiSchema");
const DB = require("../models/permit");

router
  .route("/")
  .get(controller.all)
  .post(
    validateBody(schemaBody.permit.body),
    validateToken(),
    validateRole("admin"),
    validateUnique(DB, "name"),
    controller.add
  );

router
  .route("/:id")
  .get(validateParams(schemaParams.id, "id"), controller.get)
  .patch(
    validateToken(),
    validateBody(schemaBody.permit.patch),
    validateRole("admin"),
    validateUnique(DB, "name"),
    validateParams(schemaParams.id, "id"),
    controller.patch
  )
  .delete(
    validateToken(),
    validateRole("admin"),
    validateParams(schemaParams.id, "id"),
    controller.drop
  );

module.exports = router;
