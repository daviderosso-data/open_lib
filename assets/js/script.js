// definisco variabili e costanti
let offset = 0;
let selectedCategory = '';
const searchButton = document.getElementById('searchButton');
const searchBox = document.getElementById('searchBox');
const resultsContainer = document.getElementById('result-container');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');

//Inizializzo l'autocomplete della searchBox
document.addEventListener('DOMContentLoaded', function(){
    let elems = document.querySelectorAll('.autocomplete');
    M.Autocomplete.init(elems, {
        data: {
            "fantasy": null,
            "science": null
        },
        onAutocomplete: function(val) {
            selectedCategory = val; 
        }
    });
});


//Funzione di ricerca
function fetchBooks(category,offset){
    const url = `https://openlibrary.org/subjects/${category}.json?offset=${offset}`;
    let maxLength = 20;

    fetch(url)
        .then(response => response.json())
        .then(data =>{
            resultsContainer.innerHTML = '';
            if (data.works.lenght === 0 ){
                resultsContainer.innerHTML = '<p>Nessun Libro Trovato in questa categoria</p>';
                return;
            }
            data.works.forEach(work => {
                console.log(work
                );
                
                
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
                button.className = "custumBtn btn waves-effect waves-light";
                button.textContent = "descrizione";

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
            });
        });

}

searchButton.addEventListener('click', () =>{
    offset = 0;
    fetchBooks(selectedCategory, offset);
});

nextPage.addEventListener('click', ()=>{
    offset += 12;
    fetchBooks(selectedCategory, offset);
});

prevPage.addEventListener('click', ()=>{
    if (offset > 0){
        offset -= 12;
        fetchBooks(selectedCategory, offset);
    }
});