Router.route('/', {
  name: 'carlist'
});

Router.route('/bjlist', {
  name: 'bjlist'
});

Router.route('/newcar', {
  name: 'newcar'
});


Router.route('/profile', {
  name: 'profile'
});

Router.route('/pictures/:_id', {
  name: 'pictures'
});

Router.route('/products/:_id', {
  name: 'products.show'
});

Router.route('/content/:_id', {
  name: 'content'
});

Router.route('/search', {
  name: 'search'
});