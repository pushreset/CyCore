function CompareObject(x, y) {
   var objectsAreSame = true;
   for(var propertyName in x) {
      if(x[propertyName] !== y[propertyName]) {
         objectsAreSame = false;
         break;
      }
   }
   return objectsAreSame;
}

function TestCallback(){
  var date = new Date();
  cyLogger.log('testCallback', 'info');
  return true;
}

function count(array){
	return array.length;
}

function round(val){
	return Math.round(val);
}

