class Menu{
    filtros={};

    iniciar()
    {
        //Obtengo el menu
        let elem = document.getElementById("menuTSAT");
        let submenu = elem.querySelector("#submenu1");

        //Creo un nuevo submenu y lo atacheo
        this.mRegion = ComponentSelect.Crear("Region");
        submenu.appendChild(this.mRegion.content);
        this.mRegion.content.addEventListener('change', this.cambioRegion.bind(this));

        this.mZona = ComponentSelect.Crear("Zona");
        submenu.appendChild(this.mZona.content);
        this.mZona.content.addEventListener('change', this.cambioZona.bind(this));


        this.mUTD = ComponentSelect.Crear("UTD");
        submenu.appendChild(this.mUTD.content);

        //Relleno region con cosas
        this.mRegion.setListaContent([
            {value:1, text:"Norte"},
            {value:2, text:"Sur"},
            {value:3, text:"Este"},
            {value:4, text:"Oeste"},
        ]);

    }


    cambioRegion(ev){
        console.log(ev.target.value);
        this.filtros.region=ev.target.value;
        this.actualizarZona();
    }

    cambioZona(ev){
        console.log(ev.target.value);
        this.filtros.zona=ev.target.value;
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
