import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
    console.log(`Using config ${filePath}`);
    console.log(`DB '${this.get('DB_DATABASE')}' connected with user '${this.get('DB_USERNAME')}'`);
  }

  get(key: string) {
    return this.envConfig[key];
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
      PORT: Joi.number().default(3000),
      REDIS_URL: Joi.string().required(),
    }).unknown(true);

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
