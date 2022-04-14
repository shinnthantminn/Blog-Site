const router = require("express").Router();
const controller = require("../controllers/post");
const DB = require("../models/post");
const {
  validateBody,
  validateToken,
  validateRole,
  validateParams,
} = require("../ulti/validator");
const { schemaBody, schemaParams } = require("../ulti/joiSchema");
const { image } = require("../ulti/ImageTransfer");

router
  .route("/")
  .get(controller.all)
  .post(
    validateToken(),
    validateRole("admin"),
    image(),
    validateBody(schemaBody.post.body),
    controller.add
  );

router
  .route("/:id")
  .get(validateParams(schemaParams.id, "id"), controller.get)
  .patch(
    validateParams(schemaParams.id, "id"),
    validateToken(),
    validateRole("admin"),
    image(),
    validateBody(schemaBody.post.patch),
    controller.patch
  )
  .delete(
    validateParams(schemaParams.id, "id"),
    validateToken(),
    validateRole("admin"),
    controller.drop
  );

module.exports = router;
