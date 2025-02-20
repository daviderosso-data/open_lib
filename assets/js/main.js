import '../css/style.scss';  // importo css
import { createModal, loadCategories } from "./Ui"; // importo loadCategories da ui.js
import { showBooks } from "./Ui"; // importo showBooks da ui.js
import 'materialize-css/dist/css/materialize.min.css'; // importo css di materialize
import 'materialize-css/dist/js/materialize.min.js'; // importo Js materialize

import _ from 'lodash';



let offset = 0; // definisco offset - punto in cui partire per visualizzare la lista di libri

//definisco variabili e costanti
let selectedCategory = '';
const searchButton = document.getElementById('searchButton');
let resultCategory = '';
export const searchBox = document.getElementById('autocomplete-input');

// al caricamento del DOM carico le categorie da visualizzare nella searchbox autocomplete
document.addEventListener('DOMContentLoaded', loadCategories);

// utilizzo debounce per creare un piccolo delay tra il click e la richiesta in modo da non fare richieste multiple in caso di click multipli
    const debouncedSearch = _.debounce(() => { 
    offset = 0;
    let typedCategory = searchBox.value.trim();
    if (selectedCategory === '' && typedCategory === ''){
            M.toast({ 
                html: 'Nessun termine inserito!',
                classes: 'red darken-3 white-text',
                displayLength: 2000
            });
            return;
        }
    if(selectedCategory === ''){ //attiva showbooks se il termine e digitato
        showBooks(typedCategory,offset);
        resultCategory = typedCategory;
        typedCategory = '';
    }else{ // attiva shobooks se il termine e selezionat
    offset = 0;
    showBooks(selectedCategory, offset);
    resultCategory = selectedCategory;
    selectedCategory = ''; }
}, 300); 

searchButton.addEventListener('click', debouncedSearch);

// pulsante avanti, attiva showbooks sul termine result con +12 di offset
nextPage.addEventListener('click',_.debounce( ()=>{ // debounce ritarda di 300ms la chiamata alle api per evitare problemi con click multipli
    offset += 12;
    showBooks(resultCategory, offset);
},300));

// pulsante indietro, attiva showbooks sul termine result con -12 di offset

prevPage.addEventListener('click',_.debounce(()=>{// debounce ritarda di 300ms la chiamata alle api per evitare problemi con click multipli
    if (offset > 0){
        offset -= 12;
        showBooks(resultCategory, offset);
    }
},300));

