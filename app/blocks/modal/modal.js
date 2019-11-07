document.addEventListener('DOMContentLoaded', function(){


  let modalWindow = document.querySelector('.modal'),
    modalContainer = document.querySelector('.modal__container'),
    overlay = document.querySelector('.overlay'),
    closeBtn = document.querySelector('.close'),
    closeModal = [overlay, closeBtn],
    popupElem = document.querySelectorAll('[data-pp]');

    function fadeOut(el){
      el.style.opacity = 1;
    
      (function fade() {
        if ((el.style.opacity -= 0.05) <= 0) {
          el.style.display = "none";
        } else {
          requestAnimationFrame(fade);
        }
      })();
    }
    function fadeIn(el){
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
    function clearModal() {
      setTimeout(function(){
        modalContainer.innerHTML = '';
      }, 300);
    }

    closeModal.forEach(function(el){
      el.addEventListener('click', function(){
        fadeOut(this.parentNode);
        clearModal();
      });
    });

    popupElem.forEach(function(el){
      el.addEventListener('click', function(){
        let thisAttr = this.getAttribute('data-pp');
        fadeIn(modalWindow);

        if ( thisAttr === 'city' ) {
          $('.modal__container').load('/modal.html #city');
            // let cities = ['Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск', 'Омск', 'Самара', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Пермь', 'Воронеж', 'Волгоград'],
            //       ul = document.createElement('ul');

            //   let list = modalContainer.appendChild(ul);

            //   cities.forEach(function(item){
            //     let li = document.createElement('li');
            //     list.appendChild(li).textContent = item;
            //   });
        }

      });
    });

    var verseChoose = document.querySelector('select');
    var poemDisplay = document.querySelector('pre');

    verseChoose.onchange = function() {
      var verse = verseChoose.value;
      updateDisplay(verse);
    };
    
});



