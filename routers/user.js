const router = require("express").Router();
const controller = require("../controllers/user");
const helper = require("../ulti/helper");
const {
  validateBody,
  validateToken,
  validateUnique,
  validateRole,
  validateParams,
} = require("../ulti/validator");
const { schemaBody, schemaParams } = require("../ulti/joiSchema");
const DB = require("../models/admin");

router.get("/get/All", controller.all);

router.post("/create", [
  validateBody(schemaBody.admin.body),
  validateToken(),
  validateUnique(DB, "email"),
  validateRole("admin"),
  controller.createAdmin,
]);

router.post("/", [validateBody(schemaBody.admin.login), controller.login]);

router.get("/:id", [validateParams(schemaParams.id, "id"), controller.get]);

router.delete(
  "/:id",
  validateParams(schemaParams.id, "id"),
  validateToken(),
  validateRole("admin"),
  controller.drop
);

router.post("/add/role", [
  validateBody(schemaBody.admin.role),
  validateToken(),
  validateRole("admin"),
  controller.addRole,
]);

router.post("/add/permit", [
  validateBody(schemaBody.admin.permit),
  validateToken(),
  validateRole("admin"),
  controller.addPermit,
]);

router.delete("/remove/role", [
  validateBody(schemaBody.admin.role),
  validateToken(),
  validateRole("admin"),
  controller.removeRole,
]);

router.delete("/remove/permit", [
  validateBody(schemaBody.admin.permit),
  validateToken(),
  validateRole("admin"),
  controller.removePermit,
]);

module.exports = router;
