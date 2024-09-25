import { FilterSelect } from "./js/generalComponents.js";
import { getBaseUrl } from "./js/utils.js";

class FilterConectividad extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.addEventListener("selectChanged", this);
        this.render();
    }

    handleEvent(event){
        if (event.type === "selectChanged") {
            if( event.srcElement.id === "region" ){
                // ! Clean previous values
                this.querySelector("#utd").cleanList();
                this.querySelector("#zona").cleanList();

                // ! Load ZONA
                this.querySelector("#zona").loadList({url: getBaseUrl() + "/data/listTwo.json" })

            } else if( event.srcElement.id === "zona" ){
                // !Load UTD
                this.querySelector("#utd").loadList({url: getBaseUrl() + "/data/listThree.json" })
            }
        }
    }

    render(){
        this.innerHTML = `
        <div style="display: flex; gap: 7px; width: 25%;">
            <filter-select style="width: 100%;" id="region" name="region" title="Región"></filter-select>
            <filter-select style="width: 100%;" id="zona" name="zona" title="Zona"></filter-select>
            <filter-select style="width: 100%;" id="utd" name="utd" title="UTD"></filter-select>
        </div>`;

        this.querySelector("#region").loadList({url: getBaseUrl() + "/data/listOne.json"});
    }

}

// ! Esto iría en el componente Filter
customElements.define("filter-select", FilterSelect);
customElements.define("filter-conectividad", FilterConectividad);