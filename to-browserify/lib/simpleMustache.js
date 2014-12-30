module.exports = function render (thing, template) {
  var result = template || '';
  for(var key in thing) {
    var hook = '{{' + key + '}}';
    while( result.indexOf(hook) !== -1 ){
      result = result.replace(hook, thing[key]);
    }
  }
  return result;
};
