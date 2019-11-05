(function changeQuantityInput() {
  if ( document.querySelector('[data-js=quantity]') ) {

    let elem = document.querySelectorAll('[data-js=quantity]');

    elem.forEach(function(item){
      let elemDecrement = item.children[0],
          elemIncrement     = item.children[2],
          elemQuantity      = item.children[1],
          elemQuantityValue = elemQuantity.value;

      elemDecrement.addEventListener('click', function() {
        if (elemQuantityValue > 1) {
          --elemQuantityValue;
          elemQuantity.setAttribute('value', elemQuantityValue);
          elemQuantity.value = elemQuantityValue;
        }
      });

      elemIncrement.addEventListener('click', function() {
        ++elemQuantityValue;
        elemQuantity.setAttribute('value', elemQuantityValue);
        elemQuantity.value = elemQuantityValue;
      });
 
      elemQuantity.addEventListener('input', function() {
        elemQuantityValue = this.value;
        elemQuantity.setAttribute('value', elemQuantityValue);
        
        if ( elemQuantityValue == '' ) {
          elemQuantity.setAttribute('value', 0);
        } 
      });

    });
  }
}());