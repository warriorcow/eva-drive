$(document).ready(function(){
  $('[data-js=slideToggle]').click(function(e){
    e.preventDefault();
    console.log('test')
    $(this).next().slideToggle(250);
  });
});
