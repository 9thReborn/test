import Joi from "joi";

export const accountCreationSchema = Joi.object().keys({
  accountHolderName: Joi.string()
    .required()
    .trim()
    .pattern(/^[a-zA-Z\s'-]+$/)
    .min(5)
    .max(50)
    .label("Account Holder Name").messages({
      "string.pattern.base": "{{#label}} contains invalid characters",
      "string.min": "{{#label}} should contain at least {{#limit}} characters",
      "string.max": "{{#label}} should contain at most {{#limit}} characters"
  }),
  accountHolderDoB: Joi.string().required().label("Account Holder Name"),
  accountType: Joi.string().required(),
  initialBalance: Joi.number()
    .required()
    .min(0)
    .label("Initial Balance")
    .messages({ "number.min": "{{#label}} cannot be a negative value" }),
});

export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
