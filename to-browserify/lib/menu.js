var fs = require('fs');
var render = require('./simpleMustache');
var cartIcon = require('./cartIcon');

var menuItemTemplate = fs.readFileSync(__dirname+'/../templates/menu-item.html').toString();

module.exports = new MenuController();

function MenuController (){

  this.renderMenu          = renderMenu;
  this.listenForMenuClicks = listenForMenuClicks;

}

function renderMenu (thingsForSale) {
  var menu = document.getElementById('shoppingMenu');
  menu.innerText = '';
  var list = document.createElement('OL');
  menu.appendChild(list);

  thingsForSale.forEach(function(thing){
    list.innerHTML += render( thing, menuItemTemplate );
  });
}

function listenForMenuClicks(thingsForSale, cart){
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
  var cart = shop('alexa-finlay-art-store');
  cart.load();

  var id = this.getAttribute('data-id');
  var toAdd = getItemById( id );
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
  thingsForSale.forEach(function(thing){
    if(parseInt(thing.id) === parseInt(id)){
      result = thing;
    }
  });
  return result;
}


