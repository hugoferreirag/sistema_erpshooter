exports.up = function(knex, Promise) {
    return knex.schema.createTable('weapons_nf', table=>{
        table.increments('id').primary()
        table.string('nf').notNull()
        table.timestamp('date').notNull()
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('weapons_nf')
  };
  