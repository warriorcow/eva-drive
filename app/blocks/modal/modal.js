let modalWindow = document.querySelector('.modal'),
    modalContainer = document.querySelectorAll('.modal__container'),
    overlay = document.querySelector('.overlay'),
    closeBtn,
    popupElem = document.querySelectorAll('[data-pp]');

(function addCloseBtn() {
  let btn = document.createElement('div');
  btn.classList.add('close');
  modalContainer.forEach(function(el){
    el.appendChild(btn);
  });
  closeBtn = document.querySelector('.close');
  return closeBtn;
})();
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
function showPopup(id) {
  modalContainer.forEach(function(el){
    if ( id === el.id) {
      fadeIn(modalWindow);
      fadeIn(el);
      console.log(`POPUP ${id} INIT`);
    }
  });
}
function closePopup() {
  fadeOut(modalWindow);
  modalContainer.forEach(function(el){
    fadeOut(el);
  });
}

let closeModal = [overlay, closeBtn];
closeModal.forEach(function(el){
  el.addEventListener('click', function(){
    closePopup();
  });
});

popupElem.forEach(function(el){
  el.addEventListener('click', function(){
    let thisAttr = el.getAttribute('data-pp');
    console.log(thisAttr);
    showPopup(thisAttr);
  });
});


