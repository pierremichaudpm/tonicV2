export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  // Set French as default admin language
  locales: ['fr', 'en'],
  // Fix admin URL and CORS for production deployment
  url: env('ADMIN_URL') || '/admin',
  serveAdminPanel: env.bool('SERVE_ADMIN', true),
  forgotPassword: {
    from: env('FROM_EMAIL', 'no-reply@groupetonic.ca'),
    replyTo: env('FROM_EMAIL', 'no-reply@groupetonic.ca'),
  },
});
