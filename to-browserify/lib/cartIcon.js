module.exports = {
  updateCartLabel: updateCartLabel,
  getTotalQty: getTotalQty,
};

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
