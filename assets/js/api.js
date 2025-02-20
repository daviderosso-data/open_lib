import axios from 'axios'; // importo libreria axios
import { createModal } from './Ui'; // importo la funzione createModal da ui.js

// fetch su openlibrary che restituisce una lista di libri in base a offset
export async function fetchBooks(category, offset) {
    const url = `https://openlibrary.org/subjects/${category}.json?offset=${offset}`;
    try {
        const { data } = await axios.get(url); 
        return data;
}catch(error){
    console.error('Errore durante la richiesta', error);
}  
 }

 // funzione che fa un fetch su openlibrary in base alla key del libro e crea un modal utilizzando createModal di ui.js 
 export async function showDescription(key,title){
    console.log("Recupero descrizione per:", key);

    let apiUrl = `https://openlibrary.org${key}.json`;

    try {
        const { data } = await axios.get(apiUrl);

        let description = _.get(data, 'description', 'Nessuna descrizione disponibile.' );
        console.log(description);
        console.log(description.value);
        if (description === 'string'){
            return;
        }else{
            description = _.get(data, 'description.value', 'Nessuna descrizione.' );
        }
        createModal(description,title);

    } catch (error) {
        console.error("Errore nel recupero della descrizione:", error.message );
    }
}