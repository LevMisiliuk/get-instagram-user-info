function searchToggle(obj, evt) {
  var container = obj.closest('.search-wrapper');
  if (!container.classList.contains('active')) {
    container.classList.add('active');
    evt.preventDefault();
  } else if (container.classList.contains('active') && !obj.closest('.input-holder')) {
    container.classList.remove('active');
    // clear input
    container.querySelector('.search-input').value = '';
  }
}


