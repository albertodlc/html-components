class HelloWorld extends HTMLElement {
    templateStr = `
    <style>
        span {
            font-weight: bold;
        }
    </style>
    <span id="titulo">Etiqueta</span>
    <select id="lista" multiple title="pepe">
    </select>`;

    constructor() {
        super();
        this.name = "ninguno";
        this.cambio = new CustomEvent('cambio',{composed:true});
    }

    static get observedAttributes() {
        return ['name','autoupdate'];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        this[property] = newValue;
    }

    // connect component
    connectedCallback() {
        this.content = this.attachShadow({ mode: 'open' });
        let parent = this.content;

        this.content.innerHTML=this.templateStr;

        this.content.getElementById("titulo").innerHTML=this.name;

        let lista = this.content.getElementById("lista");
        lista.onchange = function(ev){
            //console.log("Select! " + ev.target.value);
            parent.dispatchEvent(new CustomEvent('cambio',{detail:ev.target, composed:true}));
        };

        if(this.autoupdate){
            console.log("Autoupdate");
        }else{
            console.log("NO Autoupdate");
        }
    }

    paco(){
        console.log("esta");
    }

    setListaContent(params){
        let paramsStr="";
        params.forEach(p => {
            paramsStr += "<option value='"+p.value+"'>"+p.text+"</option>";
        });
        let lista = this.content.querySelector("#lista");
        lista.innerHTML=paramsStr;
    }

}

customElements.define('hello-world', HelloWorld);
