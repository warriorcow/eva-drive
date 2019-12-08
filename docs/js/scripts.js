"use strict";

$('#burger').click(function () {
  $('.menu-mobile').toggleClass('active');
}); // $('.slider').slick({
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

$('.rating li').click(function () {
  var choiseStar = $(this).attr('data-star');
  $(this).parent().attr('data-stars', choiseStar);
});
var matMaterial = document.querySelectorAll('[name=material]'),
    matColor = document.querySelectorAll('[name=color]'),
    matBorder = document.querySelectorAll('[name=color_edging]'),
    matPreviewColor = document.querySelector('.constructor__preview-color'),
    matPreviewBorder = document.querySelector('.constructor__preview-border');
matMaterial.forEach(function (el) {
  if (el.hasAttribute('checked')) {
    var thisAttr = el.getAttribute('data-img');
    matPreviewColor.setAttribute('src', thisAttr);
  }

  el.addEventListener('change', function () {
    var thisAttr = el.getAttribute('data-img');
    matPreviewColor.setAttribute('src', thisAttr);
  });
});
matColor.forEach(function (el) {
  if (el.hasAttribute('checked')) {
    var thisAttr = el.getAttribute('data-img');
    matPreviewColor.setAttribute('src', thisAttr);
  }

  el.addEventListener('change', function () {
    var thisAttr = el.getAttribute('data-img');
    matPreviewColor.setAttribute('src', thisAttr);
  });
});
matBorder.forEach(function (el) {
  if (el.hasAttribute('checked')) {
    var thisAttr = el.getAttribute('data-img');
    matPreviewBorder.setAttribute('src', thisAttr);
  }

  el.addEventListener('change', function () {
    var thisAttr = el.getAttribute('data-img');
    matPreviewBorder.setAttribute('src', thisAttr);
  });
});
var picker = new Pikaday({
  field: document.querySelector('[data-js=datepicker]'),
  format: 'D/M/YYYY',
  toString: function toString(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return "".concat(day, "/").concat(month, "/").concat(year);
  },
  i18n: {
    previousMonth: 'Предыдущий месяц',
    nextMonth: 'Следующий месяц',
    months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  }
});
var onlyNumbers = document.querySelectorAll('[data-js=number]');
onlyNumbers.forEach(function (item) {
  item.onkeydown = function (event) {
    if (event.which >= 96 && event.which <= 105 || event.which >= 48 && event.which <= 57 || event.which == 8 || event.which >= 37 && event.which <= 40 || event.which == 46) {
      return true;
    } else {
      return false;
    }
  };
});
$("[type=tel]").mask("+7 (000) 000-00 00", {
  translation: {
    Z: {
      pattern: /[0-9]/,
      optional: !0
    }
  }
});
var modalWindow = document.querySelector('.modal'),
    modalContainer = document.querySelectorAll('.modal__container'),
    overlay = document.querySelector('.overlay'),
    closeBtn,
    popupElem = document.querySelectorAll('[data-pp]');

(function addCloseBtn() {
  var btn = document.createElement('div');
  btn.classList.add('close');
  modalContainer.forEach(function (el) {
    el.appendChild(btn);
  });
  closeBtn = document.querySelector('.close');
  return closeBtn;
})();

function fadeOut(el) {
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= 0.05) <= 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el) {
  el.style.opacity = 0;
  el.style.display = "flex";

  (function fade() {
    var val = parseFloat(el.style.opacity);

    if (!((val += 0.05) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

function showPopup(id) {
  modalContainer.forEach(function (el) {
    if (id === el.id) {
      fadeIn(modalWindow);
      fadeIn(el);
      console.log("POPUP ".concat(id, " INIT"));
    }
  });
}

function closePopup() {
  fadeOut(modalWindow);
  modalContainer.forEach(function (el) {
    fadeOut(el);
  });
}

var closeModal = [overlay, closeBtn];
closeModal.forEach(function (el) {
  el.addEventListener('click', function () {
    closePopup();
  });
});
popupElem.forEach(function (el) {
  el.addEventListener('click', function () {
    var thisAttr = el.getAttribute('data-pp');
    console.log(thisAttr);
    showPopup(thisAttr);
  });
});
$(document).ready(function () {
  $('[data-js=slideToggle]').click(function (e) {
    e.preventDefault();
    console.log('test');
    $(this).next().slideToggle(250);
  });
});

(function changeQuantityInput() {
  if (document.querySelector('[data-js=quantity]')) {
    var elem = document.querySelectorAll('[data-js=quantity]');
    elem.forEach(function (item) {
      var elemDecrement = item.children[0],
          elemIncrement = item.children[2],
          elemQuantity = item.children[1],
          elemQuantityValue = Number(elemQuantity.value);
      elemDecrement.addEventListener('click', function () {
        if (elemQuantityValue > 1) {
          --elemQuantityValue;
          elemQuantity.setAttribute('value', elemQuantityValue);
          elemQuantity.value = elemQuantityValue;
        }
      });
      elemIncrement.addEventListener('click', function () {
        if (elemQuantityValue >= 99) {
          return false;
        } else {
          ++elemQuantityValue;
          elemQuantity.setAttribute('value', elemQuantityValue);
          elemQuantity.value = elemQuantityValue;
        }
      });
      elemQuantity.addEventListener('input', function () {
        elemQuantityValue = this.value;

        if (elemQuantityValue.length < 3) {
          elemQuantity.setAttribute('value', elemQuantityValue);
        } else {
          elemQuantityValue = 99;
          elemQuantity.setAttribute('value', elemQuantityValue);
          elemQuantity.value = elemQuantityValue;
        }
      });
    });
  }
})();

var slider = document.querySelectorAll('.slider-slider');
slider.forEach(function (item) {
  var attr = item.getAttribute('data-js');

  if (attr == 'swiperThumbs') {
    var swiperThumbsBottom = new Swiper(item.children[1], {
      slidesPerView: 3,
      freeMode: true,
      spaceBetween: 10,
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
      }
    });
    var swiperThumbsTop = new Swiper(item.children[0], {
      slidesPerView: 1,
      spaceBetween: 10,
      thumbs: {
        swiper: swiperThumbsBottom
      }
    });
  }

  if (attr == 'swiperProducts') {
    var swiperProducts = new Swiper("[data-js=".concat(attr, "]"), {
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true
          }
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true
          }
        },
        1080: {
          slidesPerView: 3,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true
          }
        }
      }
    });
  }

  if (attr == 'swiperImage') {
    var swiperImage = new Swiper("[data-js=".concat(attr, "]"), {
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true
          }
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true
          }
        },
        1080: {
          slidesPerView: 4,
          spaceBetween: 20,
          scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true
          }
        }
      }
    });
  }
});