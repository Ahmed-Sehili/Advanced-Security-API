import { body, validationResult } from "express-validator";

const userValidationRules = [
  body("name")
    .isAlphanumeric()
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters long"),
  body("password")
    .isAlphanumeric()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const taskValidationRules = [
  body("content")
    .isAlphanumeric()
    .isLength({ min: 1, max: 255 })
    .withMessage(
      "Content must be at least 1 character and less than 255 characters long"
    ),
  body("completed")
    .isBoolean()
    .withMessage("Completion status must be a boolean"),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

export { userValidationRules, taskValidationRules, validate };
