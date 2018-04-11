
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('items', function(table) {
            table.increments('id').primary();
            table.string('item'); // Name of the item
            table.binary('picture'); // A picture for the item. Binary === blob
            table.string('description'); // Description of the item
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('items'),
    ]);
};
