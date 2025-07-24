module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: env('DATABASE_URL'),
    acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
  },
});