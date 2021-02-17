const navOpen = () => {
   const burger = document.querySelector('.burger');
   const navRight = document.querySelector('.header-nav-right');

   burger.addEventListener('click', () => {
      navRight.classList.toggle('navLinks-active');
      burger.classList.toggle('burger-right');
   });
}

function parallaxEffect (event) {
   const parallax = this.querySelectorAll('.parallax');

   [...parallax].forEach((item) => {
      const speed = item.dataset.speed;
      const formula = event.clientX*speed/1000;
      item.style.transform = `translateX(${formula}px)`;
      // item.style.transform = `translateY(${formula/4}px)`;
   });
}

document.querySelector('.header').addEventListener('mousemove', parallaxEffect);

navOpen();