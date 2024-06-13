const messages = require("../constants/messages");
const Todo = require("../models/Todo");
const knex = require("../db")

// Get all todos
exports.findAll = async () => {
    try {
      return await knex("todo")
        .select(
          "id",
          "title",
          "description",
          "is_completed"
        ).orderBy('id', 'asc');
        //.where("is_completed", false);
    } catch (err) {
      console.error(err);
      throw new Error("Error while fetching todos");
    }
  };

  // Get a todo by id
  exports.findById = async (id) => {
    try {
      return await knex("todo")
        .select(
          "id",
          "title",
          "description",
          "is_completed"
        )
        .where("id",id);
    } catch (err) {
      console.error(err);
      throw new Error("Error while fetching todos");
    }
  };

// Create a todo
  exports.create = async (data) => {
    const trx = await knex.transaction();
    try {
      const result = await trx("todo")
        .insert(data)
        .returning(["id","title","is_completed"]);
      await trx.commit();
      return result;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  };

// Update a todo
  exports.update = async ({id, title, description, is_completed}) => {
    const trx = await knex.transaction();
    try {
      const result = await trx("todo")
        .where({id})
        .update({title, description, is_completed});
      await trx.commit();
      return result;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  };

  // Update status of a todo
  exports.updateStatus = async ({id, is_completed}) => {
    const trx = await knex.transaction();
    try {
      const result = await trx("todo")
        .where({id})
        .update({is_completed});
      await trx.commit();
      return result;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  };

  exports.delete = async (id) => {
    try {
      const result = await knex("todo").where({ id }).del();
  
      if (result === 0) {
        throw new Error(messages.generic.not_found);
      }
      return result;
    } catch (err) {
      throw new Error(err.message || "Error while deleting todo");
    }
  };
