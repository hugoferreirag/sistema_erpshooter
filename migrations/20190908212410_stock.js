exports.up = function(knex, Promise) {
    return knex.schema.createTable('stock', table=>{
        table.increments('id').primary()
        table.integer('munition_id').notNull()
        table.string('caliber').notNull()
        table.integer('quantity').notNull()
        table.integer('old_quantity').notNull()
        table.timestamp('date').notNull()
        table.integer('launch').notNull()
        table.integer('provider_id').notNull()
        table.string('provider').notNull()
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('stock')
  };
  