import axios from 'axios';

export async function fetchBooks(category, offset) {
    const url = `https://openlibrary.org/subjects/${category}.json?offset=${offset}`;
    try {
        const { data } = await axios.get(url); 
        return data;
}catch(error){
    console.error('Errore durante la richiesta', error);
}  
 }