
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function(table) {
            table.increments('id').primary();
            table.string('item'); // Name of the item
            table.blob('picture'); // A picture for the item if added
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('items'),
    ]);
};
