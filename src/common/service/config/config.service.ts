import * as dotenv from 'dotenv';
import Service from '../../decorators/service';
import configSchema from './config.schema';

dotenv.config();

@Service()
class ConfigService {
  #config = process.env;

  constructor() {
    this.#validateConfig();
  }

  #validateConfig() {
    const { value, error } = configSchema.validate(this.#config);

    if (error) throw error;

    Object.entries(value).forEach(([key, value]) => {
      if (key in this) Object.assign(this, { [key]: value });
    });
  }

  NODE_ENV = '';

  PORT = NaN;
}

export default ConfigService;
