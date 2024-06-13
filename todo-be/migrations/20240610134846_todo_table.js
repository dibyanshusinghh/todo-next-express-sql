exports.up = function (knex) {
    return knex.schema.createTable("todo", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("description");
      table.boolean("is_completed").defaultTo(false);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("todo");
  };
  
