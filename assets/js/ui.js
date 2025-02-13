import axios from 'axios';
import { searchBox } from './main';
import { fetchBooks } from "./api";

const resultsContainer = document.getElementById('result-container');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const noResultContainer = document.getElementById('noResultContainer');
 
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

export async function showBooks(category,offset){
    let maxLength = 20;
    const url = `https://openlibrary.org/subjects/${category}.json?offset=${offset}`;
        const data = await fetchBooks(category, offset);
        console.log(data.work_count);
        if (data.work_count === 0){
            resultsContainer.innerHTML = '';
            const noResult = document.createElement('div');
            noResult.className = 'noResult';
            noResult.textContent = " :-( nessun libro trovato con questa ricerca";
            noResultContainer.appendChild(noResult);
        }
            noResultContainer.innerHTML = '';
            resultsContainer.innerHTML = '';

            let totalBooks = data.work_count; 
            let totalPages = Math.ceil(totalBooks / 12);
            let currentPage = Math.floor(offset/ 12) + 1;

            document.getElementById("page-count").textContent = `Pagina ${currentPage} di ${totalPages}`;

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
                
                
                resultsContainer.appendChild(card);

                prevPage.disabled = offset === 0;
            
            
});}
