import Joi from 'joi';

export default Joi.object({
  ...process.env,
  NODE_ENV: Joi.string().valid('development', 'staging', 'production').required(),
  PORT: Joi.number().required().default(4444),
  //   DATABASE_HOST: Joi.string().required(),
  //   DATABASE_PORT: Joi.number().required(),
  //   DATABASE_USER: Joi.string().required(),
  //   DATABASE_PASSWORD: Joi.string().required(),
  //   DATABASE_NAME: Joi.string().required(),
});
