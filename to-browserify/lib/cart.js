var render = require('./simpleMustache');
var fs = require('fs');

var cartItemTemplate = fs.readFileSync(__dirname+'/../templates/cart-member.ms').toString();

var cartController = new CartController();
module.exports = cartController;

function CartController(){
  this.init = init;
  this.renderCart = renderCart;
  this.listenForClicks = listenForClicks;

  this.listenForAddClicks = listenForAddClicks;
  this.listenForRemoveClicks = listenForRemoveClicks;

  this.itemForSaleById = itemForSaleById;
  this.itemInCartById  = itemInCartById;
}

function init (cart, thingsForSale) {
  this.cart = cart;
  this.thingsForSale = thingsForSale;

  this.renderCart();
}

function renderCart () {

  var items = addTotalsToItems( this.cart.items );

  var totalEl = document.getElementById('cartTotal');

  var list = document.getElementById('shoppingList');
  clearPreviousOlsFrom( list );

  var ol = document.createElement('OL');
  list.insertBefore(ol, totalEl);

  items.forEach(function(item){
    ol.innerHTML += render( item, cartItemTemplate );
  });

  var total = this.cart.getTotal(true);
  totalEl.innerText = textForTotal( total );

  this.listenForClicks();
}

function textForTotal( value ){
  var result = "Total: $";
  result += value.toFixed(2);
  return result;
}

function addTotalsToItems( items ){
  return items.map(function(item){
    item.total = item.qty * item.price;
    return item;
  });
}

function listenForClicks(){

  this.listenForAddClicks();
  this.listenForRemoveClicks();

}

function listenForAddClicks(){
  var things = document.getElementsByClassName('addItem');
  for( var i = 0; i < things.length; i++ ){
    things[i].addEventListener('click', addItem);
  }
}

function listenForRemoveClicks(){
  var things = document.getElementsByClassName('removeItem');
  for( var i = 0; i < things.length; i++ ){
    things[i].addEventListener('click', removeItem);
  }
}

function removeOldListeners(){
  unlistenForRemoveClicks();
  unlistenForAddClicks();
}

function unlistenForAddClicks(){
  var things = document.getElementsByClassName('addItem');
  for( var i = 0; i < things.length; i++ ){
    things[i].removeEventListener('click', addItem);
  }
}

function unlistenForRemoveClicks(){
  var things = document.getElementsByClassName('removeItem');
  for( var i = 0; i < things.length; i++ ){
    things[i].removeEventListener('click', removeItem);
  }
}

function addItem (event) {
  var id = this.getAttribute('data-id');

  var item = cartController.itemForSaleById( id );
  cartController.cart.addItem(item);
  cartController.cart.save();
  cartController.renderCart();
}

function removeItem (event) {
  var id = this.getAttribute('data-id');

  for( var i = 0; i < cartController.cart.items.length; i++){
    if( parseInt(cartController.cart.items[i].id) === parseInt(id)){
      cartController.cart.items[i].qty--;
    }
  }
  cartController.cart.save();
  cartController.renderCart();
}

function clearPreviousOlsFrom( list ){

  removeOldListeners();

  var ols = list.getElementsByTagName('ol');
  while( ols.length > 0 ){
    list.removeChild(ols[0]);
    ols = list.getElementsByTagName('ol');
  }
}

function itemForSaleById (id) {
  id = parseInt( id );
  var result;
  this.thingsForSale.forEach(function(thing){
    if(parseInt(thing.id) === id){
      result = thing;
    }
  });
  return result;
}

function itemInCartById(id) {
  id = parseInt( id );
  var result;
  this.cart.forEach(function(thing){
    if(parseInt(thing.id) === id){
      result = thing;
    }
  });
  return result;
}
