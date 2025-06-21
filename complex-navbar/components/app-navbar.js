// ! /components/app-navbar.js
export class AppNavbar extends HTMLElement {
    #menusProps;

    constructor(){
        super();

        this.innerHTML = `<nav>Loading...</nav>`;  // Or show a spinner
    }

    set menus(data){
        this.#menusProps = data;

        this.render();
    }

    #cleanLoading(){
        this.innerHTML = ``;
    }

    #createMenuItems(props){
        const items = [];

        if( props ){
            for(const menu of props){
                const item = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.style.textDecoration = 'none';


                anchor.href = menu.path;
                anchor.innerText = menu.label;

                item.id = menu.id;

                item.appendChild(anchor);

                items.push(item);
            }
        }

        return items;
    }

    render(props){
        this.#cleanLoading();
        
        const navMenu = document.createElement('nav');
        const unList = document.createElement('ul');
        unList.style.display = 'flex';
        unList.style.gap = '10px';
        unList.style.listStyleType = 'none';

        const menuItems = this.#createMenuItems(this.#menusProps);

        if( menuItems && menuItems.length > 0 ){
            menuItems.forEach( item => unList.appendChild(item) );
        }

        navMenu.appendChild(unList);

        this.appendChild(navMenu);
    }
}