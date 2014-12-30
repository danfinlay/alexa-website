var shop = require('cornershop');
var fs = require('fs');
var domReady = require('domready');

var thingsForSale = JSON.parse(fs.readFileSync(__dirname+'/thingsForSale.json').toString());

var menuController = require('./lib/menu');
var cartController = require('./lib/cart');
var cartIcon       = require('./lib/cartIcon');

var cart = shop('alexa-finlay-art-store');
cart.load();

// Once the page is loaded, this function is called:
domReady(function(){

  cartIcon.updateCartLabel( cart );
  runController();

});

// Run Controller is the routing function.
// It performs logic dependent on the current page.
function runController(){
  var locSplit = window.location.href.split('/');
  var loc = locSplit[ locSplit.length - 1 ].split('.')[0];

  switch (loc) {
    case 'shop':
      menuController.init( cart, thingsForSale );
      break;
    case 'cart':
      cartController.init(cart, thingsForSale);
      break;
  }
}


