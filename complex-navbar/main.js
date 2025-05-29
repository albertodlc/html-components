import { AppNavbar } from "./components/app-navbar.js";
import { fetchMenuMetadata } from "./services/menuServices.js";

const NAVBAR_SELECTOR = 'app-navbar';
const NAVBAR_SECTION = 'menu';

function loadWebComponents(){
    if(!customElements.get(NAVBAR_SELECTOR)){
        customElements.define(NAVBAR_SELECTOR, AppNavbar);
    }
}

async function loadMenu(){
    await customElements.whenDefined(NAVBAR_SELECTOR);

    const menuSection = document.getElementById(NAVBAR_SECTION);

    // FETCH data
    const menuMetadata = await fetchMenuMetadata();
    
    // LOAD menu data
    const appNavbar = new AppNavbar();
    appNavbar.menus = menuMetadata;

    // ADD menu to webapp
    menuSection.appendChild(appNavbar);
}

loadWebComponents();
await loadMenu();