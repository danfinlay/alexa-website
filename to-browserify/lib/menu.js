var fs = require('fs');
var render = require('./simpleMustache');
var cartIcon = require('./cartIcon');

var menuItemTemplate = fs.readFileSync(__dirname+'/../templates/menu-item.ms').toString();

var menuController = new MenuController();
module.exports = menuController;

function MenuController (){

  this.init                = init;
  this.renderMenu          = renderMenu;
  this.listenForMenuClicks = listenForMenuClicks;

  this.getItemById = getItemById;

}

function init (cart, thingsForSale) {

  this.cart = cart;
  this.thingsForSale = thingsForSale;

  this.renderMenu();
  this.listenForMenuClicks( thingsForSale, cart );

}

function renderMenu () {
  var thingsForSale = this.thingsForSale;
  var menu = document.getElementById('shoppingMenu');
  menu.innerText = '';
  var list = document.createElement('OL');
  menu.appendChild(list);

  thingsForSale.forEach(function(thing){
    list.innerHTML += render( thing, menuItemTemplate );
  });
}

function listenForMenuClicks(thingsForSale, cart){
  this.cart = cart;
  var things = document.getElementsByClassName('menu-item');
  console.log("We have %s things", things.length);
  for( var i = 0; i < things.length; i++ ){
    var el = things[i];
    console.log("Adding click listener to ");
    console.dir(el);
    el.addEventListener('click', purchaseRequest);
  }
}

function purchaseRequest (event) {
  var cart = menuController.cart;
  var id = this.getAttribute('data-id');
  var toAdd = menuController.getItemById( id );
  cart.addItem( toAdd );
  cartIcon.updateCartLabel(cart);
  cart.save();
  showCart(cart);
}

// Show Cart
//
// Just a placeholder method for showing the cart.
// Haven't decided yet on same-page popover or a navigation change.
function showCart (cart) {

  var urlDivided = window.location.href.split('/');
  urlDivided[ urlDivided.length - 1 ] = 'cart.html';
  window.location.href = urlDivided.join('/');

}

function getItemById (id) {
  var result;

  this.thingsForSale.forEach(function(thing){
    if(parseInt(thing.id) === parseInt(id)){
      result = thing;
    }
  });
  return result;
}


