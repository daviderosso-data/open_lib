import '../css/style.scss'; 
import axios from 'axios';

let offset = 0;

let selectedCategory = '';
const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('autocomplete-input');
const resultsContainer = document.getElementById('result-container');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const noResultContainer = document.getElementById('noResultContainer');
let resultCategory = '';


async function loadCategories() {
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

document.addEventListener('DOMContentLoaded', loadCategories);


function createModal(description,title) {
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


async function showDescription(key,title){
    console.log("Recupero descrizione per:", key);

    let apiUrl = `https://openlibrary.org${key}.json`;

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        let description = data.description 
            ? (typeof data.description === "string" ? data.description : data.description.value)
            : "Nessuna descrizione disponibile.";

        createModal(description,title);

    } catch (error) {
        console.error("Errore nel recupero della descrizione:", error);
    }
}


//Funzione di ricerca
async function fetchBooks(category,offset){
    let maxLength = 20;
    const url = `https://openlibrary.org/subjects/${category}.json?offset=${offset}`;
    try {
        const { data } = await axios.get(url); 
        console.log(data);
        if (data.work_count === 0){
            resultsContainer.innerHTML = '';
            const noResult = document.createElement('div');
            noResult.className = 'noResult';
            noResult.textContent = " :-( nessun libro trovato con questa ricerca";
            noResultContainer.appendChild(noResult);
        }else{
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
   
}catch(error){
    console.error('Errore durante la richiesta', error);
}  
}

searchButton.addEventListener('click', () =>{
    if(selectedCategory === ''){
        let typedCategory = document.getElementById('autocomplete-input').value.trim();
        fetchBooks(typedCategory,offset);
        resultCategory = typedCategory;
        typedCategory = '';
    }else{
    
    offset = 0;
    fetchBooks(selectedCategory, offset);
    resultCategory = selectedCategory;
    

    selectedCategory = ''; }

});


nextPage.addEventListener('click', ()=>{
    offset += 12;
    fetchBooks(resultCategory, offset);
});

prevPage.addEventListener('click', ()=>{
    if (offset > 0){
        offset -= 12;
        fetchBooks(resultCategory, offset);
    }
});