/*jshint esversion: 6 */
"use strict";

(function() {

  window.addEventListener('mousedown', (e) => {
    document.body.classList.add('mouse-navigation');
    document.body.classList.remove('kbd-navigation');
  });

  window.addEventListener('keydown', (e) => {
    if(e.keyCode === 9) {
      document.body.classList.add('kbd-navigation');
      document.body.classList.remove('mouse-navigation');
    }
  });

  window.addEventListener('click', (e) => {
    if(e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
      e.preventDefault();
    }
  });

  window.onerror = (message, source, line, col, error) => {
    let text = error ? error.stack || error : message + ' (at ' + source + ':' + line + ':' + col + ')';
    errors.textContent += text + '\n';
    errors.style.display = '';
  };

  console.error = (old) => {
    return () => {
      errors.textContent += Array.prototype.slice.call(arguments).join(' ') + '\n';
      errors.style.display = '';
      old.apply(this, arguments);
    };
  }(console.error);

}());
