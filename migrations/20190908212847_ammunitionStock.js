exports.up = function(knex, Promise) {
    return knex.schema.createTable('ammunition_stock', table=>{
        table.increments('id').primary()
        table.string('caliber').notNull()
        table.integer('quantity').notNull()
        table.timestamp('date').notNull()
        table.integer('provider_id').notNull()
        table.string('provider').notNull()
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('ammunition_stock')
  };
  