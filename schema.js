const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),image: Joi.object({
        filename: Joi.string().allow("", null), // Optional filename
        url: Joi.string().uri().allow("", null), // Optional valid URL
      }).required(), // Ensure the image object is proimage: Joi.string().uri().allow("", null), // Ensures the image is a valid URL
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
