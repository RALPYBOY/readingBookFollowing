
//declaration des variable pour recupérer le modal
let bookModal = document.querySelector("#bookModal")
let addBook = document.getElementById("addBook")
let closeModal = document.querySelector("#closeBtn")
let saveBook = document.querySelector(".saveBook")
let bookList = document.getElementById("bookList")
let bookTitle = document.querySelector("#bookTitle")
let nomAuteur = document.querySelector("#nomAuteur")

//tableau de livre 
let books = JSON.parse(localStorage.getItem('books')) || [];

//stockage des livres
function stockLivre() {
    localStorage.setItem('books', JSON.stringify(books));
    affichageLivre();
}

//affichage des livres

function affichageLivre(){

    bookList.innerHTML = ''
    
    //creer un nouveau element pour afficher les livres
    books.forEach(nouveauLivre => {
        const bookContent = document.createElement('div');
            bookContent.innerHTML = `
                <h3 style='text-align : center; border : 2px solid black; width : 50%; '>livre : ${nouveauLivre.ValTitle} // Auteur :  ${nouveauLivre.valAuteur}</h3>
            `;
            bookList.appendChild(bookContent);
    });
    
}

//affichage du modal d'ajout de livre 
addBook.onclick = function(){
    bookModal.style.display='block'
}

//fermer le modal 
closeModal.onclick = function(){
    bookModal.style.display='none'
}

// Enregistrement des livres

saveBook.onclick = function(){
    
    const  ValTitle = bookTitle.value
    const valAuteur = nomAuteur.value
    
    //vérification de la saisi si 
    if (ValTitle && valAuteur) {
        const newBook = {ValTitle,valAuteur};
        books.push(newBook);
        stockLivre();
        bookModal.style.display = 'none';
        document.getElementById('bookTitle').value = '';
        document.getElementById('nomAuteur').value = '';
        
    }

    //aficher les livres saisi
    affichageLivre()    
}
