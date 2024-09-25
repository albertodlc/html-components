class Menu{
    filtros={};

    iniciar()
    {
        //Obtengo el menu
        let elem = document.getElementById("menuTSAT");
        let submenu = elem.querySelector("#submenu1");
        //Creo un nuevo submenu y lo atacheo
        this.mRegion = document.createElement("hello-world");
        this.mRegion.name="Region";
        submenu.appendChild(this.mRegion);

        this.mZona = document.createElement("hello-world",);
        this.mZona.name="Zona";
        submenu.appendChild(this.mZona);

        this.mUTD = document.createElement("hello-world",);
        this.mUTD.name="UTD";
        submenu.appendChild(this.mUTD);

        //Añado un event listener
        this.mRegion.addEventListener('cambio', this.cambioRegion.bind(this));
        this.mZona.addEventListener('cambio', this.cambioZona.bind(this));

        customElements.upgrade(submenu);

        //Relleno region con cosas
        this.mRegion.setListaContent([
            {value:1, text:"Norte"},
            {value:2, text:"Sur"},
            {value:3, text:"Este"},
            {value:4, text:"Oeste"},
        ]);
    }

    cambioRegion(ev){
        console.log(ev.detail.value);
        this.filtros.region=ev.detail.value;
        this.actualizarZona();
    }

    cambioZona(ev){
        console.log(ev.detail.value);
        this.filtros.zona=ev.detail.value;
        this.actualizarUTD();
    }

    async actualizarZona(){
        parent = this;
        //Usar la variable this.filtros
        fetch("/#").then((res)=>{
            if(res.ok){
                this.mZona.setListaContent([
                    {value:1, text: parent.filtros.region + " Waterloo"},
                    {value:2, text: parent.filtros.region + " Zinzinati"},
                    {value:3, text: parent.filtros.region + " Chiquiristan"},
                    {value:4, text: parent.filtros.region + " Madriz"},
                ]);
            }
        });
    }

    async actualizarUTD(){
        //Usar la variable this.filtros
        fetch("/#").then((res)=>{
            if(res.ok){
                this.mUTD.setListaContent([
                    {value:1, text:parent.filtros.region + "" + parent.filtros.zona + "UTDA"},
                    {value:2, text:parent.filtros.region + "" + parent.filtros.zona + "UTDB"},
                    {value:3, text:parent.filtros.region + "" + parent.filtros.zona + "UTDC"},
                    {value:4, text:parent.filtros.region + "" + parent.filtros.zona + "UTDD"},
                ]);
            }
        });
    }

}
