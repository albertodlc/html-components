import { defineDialogWebcomponent } from "./components/appDialog.js";

const DIALOG_TAG = 'app-dialog';

export class Main {
    init(){
        this.loadWebComponents();

        this.loadEventListeners();
    }

    loadWebComponents(){
        defineDialogWebcomponent();
    }

    loadEventListeners(){
        const modal = document.querySelector(DIALOG_TAG);
        const modalBtn = document.querySelector(`#modalBtn`);
        modalBtn.addEventListener('click', () => {
            const modal = document.createElement(DIALOG_TAG);
            const dialogWrapper = document.querySelector('#dialogWrapper');

            dialogWrapper.appendChild(modal);
            
            modal.open();
        });
    
    }
}

const main = new Main();
main.init();