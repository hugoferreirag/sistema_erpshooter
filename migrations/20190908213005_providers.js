exports.up = function(knex, Promise) {
    return knex.schema.createTable('providers', table=>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cnpj').notNull()
        table.string('product').notNull()
        table.string('agent').notNull()
        table.string('business_adress').notNull()
        table.string('email').notNull()
        table.string('tel').notNull()
        table.string('cel').notNull()
        table.string('adress').notNull()
        table.boolean('status').defaultTo(true)
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        table.timestamp('deletedAt').defaultTo(null)
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTable('providers')
  };
   