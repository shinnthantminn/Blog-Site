const router = require("express").Router();
const controller = require("../controllers/role");
const DB = require("../models/role");
const {
  validateBody,
  validateToken,
  validateRole,
  validateUnique,
  validateParams,
} = require("../ulti/validator");
const { schemaBody, schemaParams } = require("../ulti/joiSchema");
const { valid } = require("joi");

router
  .route("/")
  .get(controller.all)
  .post(
    validateBody(schemaBody.role.body),
    validateToken(),
    validateRole("admin"),
    validateUnique(DB, "name"),
    controller.add
  );

router
  .route("/:id")
  .get(validateParams(schemaParams.id, "id"), controller.get)
  .patch(
    validateBody(schemaBody.role.patch),
    validateParams(schemaParams.id, "id"),
    validateUnique(DB, "name"),
    validateToken(),
    validateRole("admin"),
    controller.patch
  )
  .delete(
    validateParams(schemaParams.id, "id"),
    validateToken(),
    validateRole("admin"),
    controller.drop
  );

router.post("/add/permit", [
  validateBody(schemaBody.role.permit),
  validateToken(),
  validateRole("admin"),
  controller.addPermit,
]);

router.delete("/remove/permit", [
  validateBody(schemaBody.role.permit),
  validateToken(),
  validateRole("admin"),
  controller.removePermit,
]);

module.exports = router;
