exports.up = function(knex, Promise) {
  return knex.schema.createTable('product_category', table=>{
      table.increments('id').primary()
      table.string('category_name').notNull()
      table.timestamp('updatedAt').defaultTo(knex.fn.now())
      table.timestamp('deletedAt').defaultTo(null)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('product_category')
};
