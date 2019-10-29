(function changeQuantityInput() {
  if ( document.querySelector('.quantity .quantity__wrap') ) {

    let elem = document.querySelectorAll('.quantity .quantity__wrap');
    elem.forEach(function(item, i, elems){
      let elemDecrement = elems[i].children[0],
      elemIncrement     = elems[i].children[2],
      elemQuantity      = elems[i].children[1],
      elemQuantityValue = elemQuantity.value;

      function getValue() {
        let values = elemQuantity.value ;
        return elemQuantityValue = values;
      }

      elemDecrement.addEventListener('click', function() {
        if (elemQuantityValue > 1) {
          --elemQuantityValue;
          elemQuantity.setAttribute('value', elemQuantityValue);
          elemQuantity.value = elemQuantityValue;
        }
      })

      elemIncrement.addEventListener('click', function() {
        ++elemQuantityValue;
        elemQuantity.setAttribute('value', elemQuantityValue);
        elemQuantity.value = elemQuantityValue;
      })

      elemQuantity.addEventListener('keyup', function() {
        if (elemQuantity.value.length <= 3) {
          getValue();
          elemQuantity.setAttribute('value', elemQuantityValue);
          elemQuantity.value = elemQuantityValue;
        } else {
          let str = elemQuantity.value;
          str = str.substring(0, str.length - 1);
          elemQuantity.value = str;
        }
      })

    });
  }
}());