const header = document.querySelector("header");
const menu = document.querySelector("#menu");
const iconoMenu = document.querySelector("#menuIcon");

//Elements height
let vh=window.innerHeight*0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);  

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//header change
window.addEventListener('scroll', cambioHeader);

let lastScroll = 0;
function cambioHeader(){
    const currentScroll = window.scrollY;
    if (currentScroll == 0) {
        header.classList="header";
        header.style="transition:ease 0.5s";
        return;
    }
    if (currentScroll > lastScroll) {
        header.classList="header scroll-down";
    }else if (currentScroll < lastScroll){
        header.classList="header scroll-up";
        header.style="transition:ease 0.5s";
    }
    lastScroll=currentScroll;
}