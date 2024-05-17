
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
            <div style=" border: 1px solid grey;
            border-radius: 7px; background-color:#005db5; width:500px;margin:20px; padding:20px; color: white">
                <span>ID: ${nouveauLivre.id}</span>
                <h3 class='lu'>livre : ${nouveauLivre.ValTitle} // Auteur :  ${nouveauLivre.valAuteur}</h3>
                <button class="readBtn">${nouveauLivre.read ? 'Lu' : 'Marquer comme Lu'}</button>
                <button class='dltBtn'>Supprimer</button></br>
            </div>
            `;
//sylisation de texte d'un livre déja lu
            if (nouveauLivre.read) {
                bookContent.style.textDecoration = 'line-through';
            }
            bookList.appendChild(bookContent);
            // fonction nous permetant d'ecouter le bouton lu 
            bookContent.querySelector('.readBtn').addEventListener('click', () => {
                nouveauLivre.read = !nouveauLivre.read;
                stockLivre();
            });
            //suppression de livre 
            bookContent.querySelector('.dltBtn').addEventListener('click', function() {
                books = books.filter(function(b) {
                    return b.id !== nouveauLivre.id;
                });
                stockLivre();
            });
            

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
    const id = Date.now()
    let read = 'lu'
    //vérification de la saisi si 
    if (ValTitle && valAuteur) {
        const newBook = {id,ValTitle,valAuteur,read : false};
        books.push(newBook);
        stockLivre();
        bookModal.style.display = 'none';
        document.getElementById('bookTitle').value = '';
        document.getElementById('nomAuteur').value = '';
        
    }

    //aficher les livres saisi
    affichageLivre()  
}
affichageLivre()  