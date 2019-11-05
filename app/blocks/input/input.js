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




function phoneMask() {
  let matrix = "+7 (___) ___ ____",
       i = 0,
      def = matrix.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
  if (def.length >= val.length) val = def;
  this.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
  });
 };

let inputPhone = document.querySelectorAll('[type=tel]');
inputPhone.forEach(function(item){
  item.addEventListener("input", phoneMask, false);
});

