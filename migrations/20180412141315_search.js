
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.raw("alter table items add fulltext(item)"),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.raw("alter table items drop index item"),
    ]);
};
