class AppMultiSelect extends HTMLElement {
	constructor(){
		super();

    	this.selected = [];
    	this.options = ['ARTECHE', 'AEG', 'BLUEBERRY', 'ORANGE', 'PEAR', 'CIRCUTOR'];
	}

	connectedCallback(){
		this.render();
	}

	#generateOptions(){
		const optionsStr = [];

		for( const option of this.options ){
			optionsStr.push(`
				<div style='display: flex; gap: 5px; align-items: center;'>
					<input type="checkbox" value="${option}">
					<span>${option}</span>
				</div>`
			);
		}

		return optionsStr.join('');
	}

	render(){
		const header = `
		<div class='multi-select-header'></div>`;

		this.innerHTML = `
		<div>
			${header}
			<div style='cursor:context-menu; position: relative; display: inline-block; padding: 7px;border: 1px solid black; border-radius: 5px;' >Seleccione fabricantes</div>
			<div style='display: block; position: absolute; background-color: #f1f1f1; min-width: 160px; max-height: 87px; overflow: auto; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); z-index: 1; padding: 7px;' >
				<div style='display: flex; flex-direction: column; gap: 4px;'>
					${this.#generateOptions()}
				</div>			
			</div>

		</div>`;
	}

}
