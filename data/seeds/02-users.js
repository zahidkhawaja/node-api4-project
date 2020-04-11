exports.seed = function(knex, Promise) {
  return knex('users').insert([
    { name: 'Say something!' } // 1
  ]);
};
