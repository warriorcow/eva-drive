$('#burger').click(function(){
  $('.menu-mobile').toggleClass('active');
});

// $('.slider').slick({
//   slidesToShow: 4,
//   rows: false,
//   infinite: true,
//   centerMode: false,
//   responsive: [
//     {
//       breakpoint: 1080,
//       settings: {
//         slidesToShow: 3
//       }
//     },{
//       breakpoint: 767,
//       settings: {
//         slidesToShow: 2,
//         centerMode: true,
//         dots: true,
//         arrows: false
//       }
//     },{
//       breakpoint: 480,
//       settings: {
//         slidesToShow: 1,
//         centerMode: true,
//         dots: true,
//         arrows: false
//       }
//     }
//   ]
// });

$('.rating li').click(function(){
  var choiseStar = $(this).attr('data-star');
  $(this).parent().attr('data-stars', choiseStar);
});