const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');


button.addEventListener('click', () => {
  if( menu.classList.contains("hidden") ){
    menu.classList.remove("hidden");
    menu.classList.add("flex");
  }else{
    menu.classList.remove("flex");
    menu.classList.add("hidden");
  }
});