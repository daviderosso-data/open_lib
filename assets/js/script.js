// Funzione per eseguire la ricerca
function search() {
    const category = document.getElementById('searchCategory').value;
    const apiUrl = `https://openlibrary.org/subjects/${category}.json`;

    // Esegue la chiamata API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}
function displayResults(data){

    console.log(data);
    const bookListContainer = document.getElementById('bookList');

    // creo una lista ordinata
    const list = document.createElement('ol');

    data.works.forEach(work => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';

        // Creazione del contenuto del titolo
        const titleDiv = document.createElement('div');
        titleDiv.className = 'title';
        titleDiv.textContent = `Title: ${work.title}`;

        // Creazione del contenuto dell'autore
        const authorDiv = document.createElement('div');
        authorDiv.className = 'author';
        const authors = work.authors.map(author => author.name).join(', ');
        authorDiv.textContent = `Author: ${authors}`;

        // Aggregazione dei contenuti nel singolo elemento di risultato
        resultItem.appendChild(titleDiv);
        resultItem.appendChild(authorDiv);

        // Aggiunta dell'elemento al contenitore dei risultati
        resultsContainer.appendChild(resultItem);
    });

    // Aggiungi la lista al contenitore
    bookListContainer.appendChild(list);
}


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {
        data: {
            "Apple": null,
            "Banana": null,
            "Cherry": null,
            "Date": null,
            "Elderberry": null,
            "Fig": null,
            "Grape": null
        }
    });
});