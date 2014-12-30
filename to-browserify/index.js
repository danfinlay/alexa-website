var shop = require('cornershop');
var fs = require('fs');
var domReady = require('domready');

var thingsForSale = JSON.parse(fs.readFileSync(__dirname+'/thingsForSale.json').toString());

var menuItemTemplate = fs.readFileSync(__dirname+'/templates/menu-item.html').toString();

var menuController = require('./lib/menu');
var cartIcon       = require('./lib/cartIcon');

// Once the page is loaded, this function is called:
domReady(function(){

  var cart = shop('alexa-finlay-art-store');
  cart.load();

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
      menuController.renderMenu( thingsForSale );
      menuController.listenForMenuClicks( thingsForSale, cart );
      break;
    case 'cart':

      break;
  }
}


