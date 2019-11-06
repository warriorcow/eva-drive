$('[data-js=slideToggle]').click(function(e){
  e.preventDefault();
  $(this).next().slideToggle(250);
});