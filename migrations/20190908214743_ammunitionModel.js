exports.up = function(knex, Promise) {
    return knex.schema.createTable('ammunition_model', table=>{
        table.increments('id').primary()
        table.string('provider_name').notNull()
        table.integer('provider_id').notNull()
        table.string('caliber').notNull()
        table.integer('category').notNull()
        table.string('model_box').notNull()
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('ammunition_model')
  };
  