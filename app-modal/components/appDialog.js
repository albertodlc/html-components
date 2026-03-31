const DIALOG_TAG = 'app-dialog';

export class AppModal extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({ mode: 'open' });

    }

    handleEvent(event){        
        if(event.type === 'click'){
            if(event.target.id === 'close-btn'){
                this.close();
            }
        }
    }

    connectedCallback(){
        this.render();
    }

    #resetDialogStyles(){
        return `
            dialog {
                padding: 0;
                border: solid black 2px;
            }
        `
    }

    render(){
        const styles = `<style>
            ${this.#resetDialogStyles()}

            dialog {
                width: 300px;
                height: 150px;

                display: flex;
                flex-direction: column;
                gap: 7px;

                background-color: #fff;
            }

            dialog::backdrop {
                background: rgba(0, 0, 0, 0.5);
            }

            .close-btn {
                background: transparent;
                border: none;
                font-size: 1.1rem;
                line-height: 1;
                cursor: pointer;
                color: #333;
            }

            #dialog-header {
                padding: 5px;

                display: flex; 
                justify-content: space-between;
                background-color: lightgreen;

                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            }

            #dialog-content {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
            }
        </style>`;

        const modalTitle = 'Modal';
        const dialogContent = 'This is a dialog!!';

        this.shadowRoot.innerHTML = `
            ${styles}
            <dialog>
                <header id="dialog-header">
                    <span>${modalTitle}</span>
                    <button id='close-btn' aria-label="Close" class='close-btn'>&times;</button>
                </header>
                <div id="dialog-content">
                    <div>
                        ${dialogContent}
                    </div>
                </div>
            </dialog>
        `;

        this.shadowRoot.addEventListener('click', this);
    }

    open(){
        const modal = this.shadowRoot.querySelector('dialog');

        modal.showModal();
    }

    close(){
        const modal = this.shadowRoot.querySelector('dialog');
        
        modal.close();
        this.remove();
    }
}

export function defineDialogWebcomponent(){
    if( !customElements.get(DIALOG_TAG) ){
	    customElements.define(DIALOG_TAG, AppModal);
    }
}