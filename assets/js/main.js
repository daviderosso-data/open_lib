import '../css/style.scss';  // importo css
import { loadCategories } from "./Ui"; // importo loadCategories da ui.js
import { showBooks } from "./Ui"; // importo showBooks da ui.js
let offset = 0; // definisco offset - punto in cui partire per visualizzare la lista di libri

//definisco variabili e costanti
let selectedCategory = '';
const searchButton = document.getElementById('searchButton');
let resultCategory = '';
export const searchBox = document.getElementById('autocomplete-input');

// al caricamento del DOM carico le categorie da visualizzare nella searchbox autocomplete
document.addEventListener('DOMContentLoaded', loadCategories);

// al click di searchButton attiva la funzione showBooks 
searchButton.addEventListener('click', () =>{
    offset = 0;


    if(selectedCategory === ''){ //attiva showbooks se il termine e digitato

        let typedCategory = searchBox.value.trim();
        showBooks(typedCategory,offset);
        resultCategory = typedCategory;
        typedCategory = '';
        

    }else{ // attiva shobooks se il termine e selezionat
    
    offset = 0;
    showBooks(selectedCategory, offset);
    resultCategory = selectedCategory;
    

    selectedCategory = ''; }

});

// pulsante avanti, attiva showbooks sul termine result con +12 di offset
nextPage.addEventListener('click', ()=>{
    offset += 12;
    showBooks(resultCategory, offset);
});
// pulsante indietro, attiva showbooks sul termine result con -12 di offset

prevPage.addEventListener('click', ()=>{
    if (offset > 0){
        offset -= 12;
        showBooks(resultCategory, offset);
    }
});

