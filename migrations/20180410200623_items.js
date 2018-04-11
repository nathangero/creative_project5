
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('items', function(table) {
            table.increments('id').primary();
            table.string('username');
            table.string('name'); // Actual name of the user
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
    ]);
};
