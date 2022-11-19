export default () => ({
  port: parseInt(process.env.PORT) || 8080,
  appName: process.env.APP_NAME,
  databaseUrl: process.env.DATABASE_URI,
  jwtSecret: process.env.JWT_SECRET,
  baseUrl: process.env.BASE_URL,
  frontendUrl: process.env.FRONTEND_URL,
  jwtExpiration: process.env.JWT_EXPIRATION,

  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
  },

  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    secretKey: process.env.CLOUDINARY_SECRET_KEY,
  },
});
