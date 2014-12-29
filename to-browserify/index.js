var shop = require('cornershop');
var fs = require('fs');
var domReady = require('domready');

var thingsForSale = JSON.parse(fs.readFileSync(__dirname+'/thingsForSale.json').toString());

var menuItemTemplate = fs.readFileSync(__dirname+'/menu-item.html').toString();

domReady(function(){

  var cart = shop('alexa-finlay-art-store');
  cart.load();

  updateCartLabel( cart );
  renderMenu( thingsForSale );

  listenForMenuClicks( thingsForSale, cart );

});

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
  updateCartLabel(cart);
  cart.save();
  showCart(cart);
}

// Show Cart
//
// Just a placeholder method for showing the cart.
// Haven't decided yet on same-page popover or a navigation change.
function showCart (cart) {
  var result = 'Your cart:\n';
  cart.items.forEach(function(item){
    result += item.name + ' ('+item.qty+'): $'+item.price*item.qty+'\n';
  });
  alert(result);
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

function renderMenu (thingsForSale) {
  var menu = document.getElementById('shoppingMenu');
  menu.innerText = '';
  var list = document.createElement('OL');
  menu.appendChild(list);

  thingsForSale.forEach(function(thing){
    list.innerHTML += render( thing, menuItemTemplate );
  });
}

function render (thing, template) {
  var result = template || '';
  for(var key in thing) {
    var hook = '{{' + key + '}}';
    while( result.indexOf(hook) !== -1 ){
      result = result.replace(hook, thing[key]);
    }
  }
  return result;
}

function updateCartLabel (cart){
  var cartIcon = document.getElementById('cartIcon');
  var items = cart.items;
  var qty = getTotalQty(cart);
  var label = '(' + qty  + ' Item';
  label += items.length === 1 ? ')' : 's)';
  var labelSpan = cartIcon.getElementsByTagName('span');
  labelSpan[0].innerText = label;
}

function getTotalQty(cart){
  var total = 0;
  cart.items.forEach(function(item){
    if(item.qty){
      total += item.qty;
    }
  });
  return total;
}
