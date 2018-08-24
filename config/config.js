module.exports = {
  "development": {
    "username": "process.env.DEV_DB_USER",
    "password": "process.env.DEV_DB_PASSWORD",
    "database": "exampledb",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "testdb",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
};
