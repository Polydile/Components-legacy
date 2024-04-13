import './prism.js'
import '@dile/ui/components/card/card';
import '@dile/ui/components/menu-hamburger/menu-hamburger';
import '@dile/ui/components/nav/nav';
import '@dile/ui/components/social-icon/social-icon';
import '@dile/ui/components/slide-show/slide-show'
console.log('hola');

document.querySelectorAll('.code-preview__button').forEach(button => {
  button.addEventListener('click', () => {
    let control = button.getAttribute('aria-controls');
    document.querySelector('#' + control).style.display = 'block'
    console.log('hola', control);
  })
})