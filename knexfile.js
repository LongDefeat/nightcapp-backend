module.exports = {
    development: {
      client: "pg",
      connection: {
        host: "localhost",
        user: "postgres",
        password: "",
        database: "nightcapp",
      },
      migrations: {
        tableName: "knex_migrations",
      },
    },
    test: {
      client: "pg",
      connection: {
        host: "localhost",
        user: "postgres",
        password: "",
        database: "nightcapp_test",
      },
      migrations: {
        tableName: "knex_migrations",
      },
    },
  };
  