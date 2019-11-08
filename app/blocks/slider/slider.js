let slider = document.querySelectorAll('.slider-slider');

slider.forEach(function(item){
  let attr = item.getAttribute('data-js');
  
  if ( attr == 'swiperThumbs' ) {
    let swiperThumbsBottom = new Swiper(item.children[1], {
      slidesPerView: 3,
      freeMode: true,
      spaceBetween: 10,
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      }
    });

    let swiperThumbsTop = new Swiper(item.children[0], {
      slidesPerView: 1,
      spaceBetween: 10,
      thumbs: {
        swiper: swiperThumbsBottom
      }
    });
  }
  
  if ( attr == 'swiperProducts' ) {
    let swiperProducts = new Swiper(`[data-js=${attr}]`, {
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },
        },
        1080: {
          slidesPerView: 3,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },
        },
      }
    });
  }

  if ( attr ==  'swiperImage') {
    let swiperImage = new Swiper(`[data-js=${attr}]`, {
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },
        },
        1080: {
          slidesPerView: 4,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
          },
        },
      }
    });
  }
});