import '../css/style.scss'; 
import { loadCategories } from "./Ui";
import { showBooks } from "./Ui";
let offset = 0;

let selectedCategory = '';
const searchButton = document.getElementById('searchButton');
let resultCategory = '';
export const searchBox = document.getElementById('autocomplete-input');


document.addEventListener('DOMContentLoaded', loadCategories);

searchButton.addEventListener('click', () =>{
    offset = 0;


    if(selectedCategory === ''){

        let typedCategory = searchBox.value.trim();
        showBooks(typedCategory,offset);
        resultCategory = typedCategory;
        typedCategory = '';
        

    }else{
    
    offset = 0;
    showBooks(selectedCategory, offset);
    resultCategory = selectedCategory;
    

    selectedCategory = ''; }

});

nextPage.addEventListener('click', ()=>{
    offset += 12;
    showBooks(resultCategory, offset);
});

prevPage.addEventListener('click', ()=>{
    if (offset > 0){
        offset -= 12;
        showBooks(resultCategory, offset);
    }
});

