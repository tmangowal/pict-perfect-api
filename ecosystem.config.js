module.exports = {
  apps: [
    {
      name: "Pict Perfect API",
      script: "./index.js",
      env: {
        NODE_ENV: "development",
        PORT: 8080,
      },
      env_test: {
        NODE_ENV: "test",
        PORT: 2000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080,
        JWTTOKEN: "FANATTIC",
      },
      time: true,
    },
  ],
};
