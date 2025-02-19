// importo librerie e funzioni
import axios from 'axios';
import { searchBox } from './main';
import { fetchBooks } from "./api";
import { showDescription } from './api';

// definisco costanti in base agli elementi del DOM
const resultsContainer = document.getElementById('result-container');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const noResultContainer = document.getElementById('noResultContainer');
const pageCount = document.getElementById("page-count");

 // funzione per autocomplete della searchbox e assegna automaticamente alla searchbox il valore corrispondente alla categoria utilizzabile per la query di ricerca
export async function loadCategories() {
    try {
        const [displayRes, searchRes] = await Promise.all([
            axios.get('assets/json/categories.json'),
            axios.get('assets/json/searchCategories.json')
        ]);

        let displayCategories = displayRes.data;
        let searchCategories = searchRes.data;
        M.Autocomplete.init(document.querySelectorAll('.autocomplete'), {
            data: displayCategories,
            onAutocomplete: (val) => {
                searchBox.value = searchCategories[val] || val;
            }
        });

    } catch (error) {
        console.error("Errore nel caricamento delle categorie:", error);
    }
}

// funzione principale di visualizzazione dei risultati
export async function showBooks(category,offset){
    let maxLength = 20; // lunghezza massima testo del titolo
        const data = await fetchBooks(category, offset);
        console.log(data.work_count);
        if (data.work_count === 0){ // messaggio di nessun risultato per la ricerca
            console.log('nessun risultato');
            resultsContainer.innerHTML = '';
            const noResult = document.createElement('div'); 
            noResult.className = 'noResult'; 
            noResult.textContent = " :-( nessun libro trovato con questa ricerca";
            noResultContainer.appendChild(noResult);
            nextPage.classList.add('hidden');
            prevPage.classList.add('hidden');
            pageCount.classList.add('hidden');

        }else{ 
            noResultContainer.innerHTML = '';
            resultsContainer.innerHTML = '';

            let totalBooks = data.work_count; 
            let totalPages = Math.ceil(totalBooks / 12);
            let currentPage = Math.floor(offset/ 12) + 1;

            pageCount.textContent = `Pagina ${currentPage} di ${totalPages}`; // contatore i pagina
            pageCount.classList.remove('hidden'); 
            data.works.forEach(work => {
                console.log(work);
                
                const card = document.createElement('div');
                card.className = 'card';

                const cardimage = document.createElement('div');
                cardimage.className = 'card-image';


                const title = document.createElement('span');
                title.className = 'card-title';
                title.textContent = work.title.length > 25 ? work.title.substring(0, 25) + "..." : work.title;


                const cover = document.createElement('img');
                cover.src =  `https://covers.openlibrary.org/b/id/${work.cover_id}.jpg`;

                const button = document.createElement('button');
                button.className = "custumBtn btn black waves-effect waves-light";
                button.textContent = "descrizione";
                button.onclick = () => showDescription(work.key,work.title);
                
                

                const author = document.createElement('p');
                author.className = 'card-author';
                author.textContent = work.authors[0].name.length > 20 ? work.authors[0].name.substring(0, 20) + "..." : work.authors[0].name;
                
                card.appendChild(title);
                card.appendChild(author);
                cardimage.appendChild(cover);
                card.appendChild(cardimage);
                cardimage.appendChild(button);
                nextPage.classList.remove('hidden');
                prevPage.classList.remove('hidden');
                
                resultsContainer.appendChild(card);

                prevPage.disabled = offset === 0;
            
            
});}}


// funzione che crea la finestra modale per visualizzare la descrizione
export function createModal(description,title) {
    let existingModal = document.getElementById("bookModal");
    if (existingModal) {
        existingModal.remove();
    }

    let modalHTML = `
        <div id="bookModal" class="modal">
            <div class="modal-content">
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
            <div class="modal-footer">
                <button class="modal-close btn black waves-effect waves-light">Chiudi</button>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHTML);

    let modalElement = document.getElementById("bookModal");
    let instance = M.Modal.init(modalElement);
    
    instance.open();
}