let onlyNumbers = document.querySelectorAll('[data-js=number]');

onlyNumbers.forEach(function(item){
  item.onkeydown = function(event) {
    if (  ( event.which >= 96 && event.which <= 105 ) ||
          ( event.which >= 48 && event.which <= 57 ) ||
          ( event.which == 8 ) ||
          ( event.which >= 37 && event.which <= 40 ) ||
          ( event.which == 46 ) ) {
            return true;
          }  else {
            return false;
          }
  };
});

$("[type=tel]").mask("+7 (000) 000-00 00",{translation:{Z:{pattern:/[0-9]/,optional:!0}}});