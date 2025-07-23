module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'defaultSecret'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'defaultSalt'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'defaultTransferSalt'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});