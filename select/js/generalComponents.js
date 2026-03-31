export class FilterSelect extends HTMLElement{
    constructor(){
        super();
        this._id = this.getAttribute("id") || "select";
        this._name = this.getAttribute("name") || "select";
        this._title = this.getAttribute("title") || "Title";
    }

    connectedCallback(){
        this.render();
        this.addEventListener("change", this);
    }

    handleEvent(event){
        if (event.type === "change") {
            const selectedValue = event.target.value;

            // Dispatch a custom event to the document
            const customEvent = new CustomEvent('selectChanged', {
                detail: { value: selectedValue },
                bubbles: true,
                composed: true
            });
    
            this.dispatchEvent(customEvent);
        }
    }

    render(){
        this.innerHTML = /* html */`
            <div style="display:flex; justify-content: center; flex-direction:column; width: 200px; text-align:center; gap: 7px;">
                <label for="${this._id}">${this._title}</label>
                <select id="${this._id}" name="${this._name}"></select>
            </div>
        `;
    }

    selectValue({selected}){
        let selectedOption = this.querySelectorAll(`#${this._id} > option`).forEach( option => {
            if( option.value == selected ){
                option.selected = true;
            } else {
                option.selected = false;
            }
        });
    }

    async loadList({url, selected}){
        const datas = await fetch(url)
        .then(res => {
            if( !res.ok ){
                throw new Error("HTTP Error: " + res.statusText);
            }

            return res.json();
        }).catch( err => console.error(err));

        const options = [];
        for( const data of datas ){
            options.push(`<option value="${data.key}">${data.value}</option>`)
        }

        this.querySelector(`#${this.id}`).innerHTML = options.join("");
    }

    cleanList(){
        this.querySelector(`#${this.id}`).innerHTML = "";
    }
}