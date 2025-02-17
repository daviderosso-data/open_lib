import axios from 'axios';
import { createModal } from './Ui';

export async function fetchBooks(category, offset) {
    const url = `https://openlibrary.org/subjects/${category}.json?offset=${offset}`;
    try {
        const { data } = await axios.get(url); 
        return data;
}catch(error){
    console.error('Errore durante la richiesta', error);
}  
 }

 export async function showDescription(key,title){
    console.log("Recupero descrizione per:", key);

    let apiUrl = `https://openlibrary.org${key}.json`;

    try {
        const { data } = await axios.get(apiUrl);

        let description = data.description 
            ? (typeof data.description === "string" ? data.description : data.description.value)
            : "Nessuna descrizione disponibile.";

        createModal(description,title);

    } catch (error) {
        console.error("Errore nel recupero della descrizione:", error.message );
    }
}