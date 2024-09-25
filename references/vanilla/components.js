class ComponentSelect{
    templateSelect = `
    <span id="titulo">Etiqueta</span>
    <select id="lista" multiple title="pepe">
    </select>`

    static Crear(nombre){
        let result = new ComponentSelect();
        result.content = document.createElement("div");
        result.content.id="menu" + nombre;
        result.content.className="hello-world";
        result.content.innerHTML=result.templateSelect;
        result.content.querySelector("#titulo").innerHTML = nombre;
        return result;
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