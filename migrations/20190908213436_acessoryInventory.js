exports.up = function(knex, Promise) {
    return knex.schema.createTable('acessory_inventory', table=>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('model').notNull()
        table.string('bar_code').notNull()
        table.string('provider').notNull()
        table.string('numeration').notNull()
        table.boolean('utilization').notNull()
        table.boolean('launch').notNull()
        table.string('nf').notNull()
        table.timestamp('date').notNull()
        table.boolean('status').defaultTo(true)
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('acessory_inventory')
  };
  