import "./styles.css";
const toggle = document.querySelector('[data-nav-toggle]');
const menu = document.querySelector('[data-nav-menu]');
if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('hidden'));
