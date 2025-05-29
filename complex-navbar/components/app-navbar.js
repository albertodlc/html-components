// ! /components/app-navbar.js
export class AppNavbar extends HTMLElement {
    constructor(){
        super();

        this.innerHTML = `<nav>Loading...</nav>`;  // Or show a spinner
    }

    set menus(data){
        this.render(data);
    }

    #cleanLoading(){
        this.innerHTML = ``;
    }

    #createMenuItems(props){
        // "id": "dashboard",
        // "label": "Dashboard",
        // "icon": "home",
        // "path": "/dashboard",
        // "roles": [
        //     "admin",
        //     "user"
        // ],
        // "children": []

        const items = [];

        if( props ){
            for(const prop of props){
                const item = document.createElement('li');
                const anchor = document.createElement('a');

                anchor.href = prop.path;
                anchor.innerText = prop.label;

                item.id = prop.id;

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
        const menuItems = this.#createMenuItems(props);

        if( menuItems && menuItems.length > 0 ){
            menuItems.forEach( item => unList.appendChild(item) );
        }

        navMenu.appendChild(unList);

        this.appendChild(navMenu);
    }
}