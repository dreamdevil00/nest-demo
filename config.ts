export const apiMountPath = process.env['API_MOUNT_PATH'];
export const apiVersion = process.env['API_VERSION'];
export const apiExplorerPath = process.env['API_EXPLORER_PATH'];

export const isProduction = process.env['IS_PRODUCTION'] === 'true';
export const nodeEnv = process.env['NODE_ENV'];

export const host = process.env['HOST'];
export const port = +process.env['PORT'];

export const mysql = {
  host: process.env['MYSQL_HOST'],
  port: +process.env['MYSQL_PORT'],
  username: process.env['MYSQL_USERNAME'],
  password: process.env['MYSQL_PASSWORD'],
  database: process.env['MYSQL_DATABASE'],
};
