exports.up = function(knex, Promise) {
    return knex.schema.createTable('acessory_model', table=>{
        table.increments('id').primary()
        table.string('provider_name').notNull()
        table.integer('provider_id').notNull()
        table.string('type').notNull()
        table.integer('category').notNull()
        table.string('model').notNull()
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('acessory_model')
  };
  