let matMaterial = document.querySelectorAll('[name=material]'),
    matColor = document.querySelectorAll('[name=color]'),
    matBorder = document.querySelectorAll('[name=color_edging]'),
    matPreviewColor = document.querySelector('.constructor__preview-color'),
    matPreviewBorder = document.querySelector('.constructor__preview-border');


    
matMaterial.forEach(function(el){
  if ( el.hasAttribute('checked') ) {
    let thisAttr = el.getAttribute('data-img');
    matPreviewColor.setAttribute('src', thisAttr);
  }
  el.addEventListener('input', function(){
    let thisAttr = el.getAttribute('data-img');
    matPreviewColor.setAttribute('src', thisAttr);
  });
});

matColor.forEach(function(el){
  if ( el.hasAttribute('checked') ) {
    let thisAttr = el.getAttribute('data-img');
    matPreviewColor.setAttribute('src', thisAttr);
  }
  el.addEventListener('input', function(){
    let thisAttr = el.getAttribute('data-img');
    matPreviewColor.setAttribute('src', thisAttr);
  });
});

matBorder.forEach(function(el){
  if ( el.hasAttribute('checked') ) {
    let thisAttr = el.getAttribute('data-img');
    matPreviewBorder.setAttribute('src', thisAttr);
  }
  el.addEventListener('input', function(){
    let thisAttr = el.getAttribute('data-img');
    matPreviewBorder.setAttribute('src', thisAttr);
  });
});

