
exports.up = function(knex, Promise) {
  
    return knex.schema.createTable('clientes', table=>{
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('cel').notNull()
        table.string('tel')
        table.string('adress').notNull()
        table.string('business_adress')
        table.boolean('associate').defaultTo(false)
        table.string('cpf').unique().notNull()
        table.string('rg').unique().notNull()
        table.string('organ_xpd').notNull()
        table.date('document_emission').notNull()
        table.string('picture',1000)
        table.string('nacionality').notNull()
        table.string('naturality').notNull()
        table.string('civil_status').notNull()
        table.string('father_name').notNull()
        table.string('mother_name').notNull()
        table.date('date_of_birth').notNull()
        table.string('cr_number').notNull().unique()
        table.date('cr_date').notNull()
        table.integer('level_shooter').defaultTo(0)
        table.date('cr_validity').notNull()
        table.date('affiliation').defaultTo(knex.fn.now())
        table.string('bar_code', 8).notNull().unique()
        table.string('profissao').notNull()
        table.string('indicacao')
        table.string('cr_picture')
        table.string('cnh_picture')
        table.string('craf_picture')
        table.string('biometria_picture')
        table.boolean('status').defaultTo(true)
        table.integer('presence')
        table.timestamp('deletedAt').defaultTo(null)
        table.timestamp('updatedAt').defaultTo(knex.fn.now())
        
    })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clientes')
};
