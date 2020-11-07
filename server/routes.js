const woodBuilder = require('./controllers');

module.exports = app => {
  app
    .route('/woods')
    .get(woodBuilder.list_all_woods)
    .post(woodBuilder.create_a_wood)
    .put(woodBuilder.update_a_wood)
    .delete(woodBuilder.delete_a_wood);    
};