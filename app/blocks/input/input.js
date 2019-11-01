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