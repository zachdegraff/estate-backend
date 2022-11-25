export default () => ({
  port: parseInt(process.env.PORT) || 8080,
  appName: process.env.APP_NAME,
  databaseUrl: process.env.DATABASE_URI || 'localhost:27017',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  baseUrl: process.env.BASE_URL,
  frontendUrl: process.env.FRONTEND_URL,
  jwtExpiration: process.env.JWT_EXPIRATION,

  email: {
    host: process.env.MAIL_HOST,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    port: process.env.MAIL_PORT,
    from: process.env.MAIL_FROM,
  },

  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    secretKey: process.env.CLOUDINARY_SECRET_KEY,
  },
});
