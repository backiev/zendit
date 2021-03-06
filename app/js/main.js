document.addEventListener("DOMContentLoaded", () => {
   const navOpen = () => {
      const burger = document.querySelector('.burger');
      const navRight = document.querySelector('.header-nav-right');
   
      burger.addEventListener('click', () => {
         navRight.classList.toggle('navLinks-active');
         burger.classList.toggle('burger-right');
      });
      document.addEventListener('click', (event) => {
         if (navRight.classList[3] && event.target !== burger) {
            navRight.classList.remove('navLinks-active');
            burger.classList.remove('burger-right');
         }
         // console.log(navRight.classList[3]);
      })
   }
   
   function parallaxEffect (event) {
      const parallax = this.querySelectorAll('.parallax');
   
      [...parallax].forEach((item) => {
         const speed = item.dataset.speed;
         const formula = event.clientX*speed/1000;
         item.style.transform = `translateX(${formula}px)`;
      });
   }
   
   document.querySelector('.header').addEventListener('mousemove', parallaxEffect);
   
   navOpen();
});