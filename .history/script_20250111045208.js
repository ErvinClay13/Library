const dialog = document.getElementById('myDialog');
const form = document.getElementById('form');
const content = document.getElementById('content');
const submit = document.getElementById('submit');
const addBook = document.getElementById('addBook');
const cancel = document.getElementById('cancel');

const myLibrary = [];

const theHornet = new Book('The Hornet', 'Jeff Lue', 240, true);
const theHornetAndTheWasp = new Book('The Hornet and THe Wasp', 'Jeff Lue', 240, false);

myLibrary.push(theHornet);
myLibrary.push(theHornetAndTheWasp);


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} ${this.author} ${this.pages} ${this.read}`;
}


Book.prototype.toggleRead = function() {
    this.read = !this.read;
}



addBook.addEventListener("click", () => {
    dialog.showModal();
});

cancel.addEventListener("click", () => {
    dialog.close();
});

submit.addEventListener("click", (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('isRead').checked;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    form.reset();
    showBooks();
    dialog.close();
});

function showBooks() {
    
    content.innerHTML = '';          

    myLibrary.forEach((book, index) => {                   //going through the array myLibrary
        const card = document.createElement('div');        //creating a new card for each book created through the modal 
        card.classList.add('card');                        //adding card to the class

        card.innerHTML =                                      //creating the text that will be displayed on the card
            `<p><strong>Title: </strong>${book.title}</p>       
             <p><strong>Author: </strong>${book.author}</p>
             <p><strong>Pages: </strong>${book.pages}</p>
             <p><strong>Read: </strong>${book.read ? 'Yes' : 'No'}</p>`;   //using the user input to create the new book on the card

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.textContent = ('Delete');

        deleteBtn.addEventListener("click", () => {
            myLibrary.splice(index, 1);
            showBooks();
        });

        const read = document.createElement('button');
        read.classList.add('read');
        read.textContent = ('Read');

        read.addEventListener("click", () => {
            book.toggleRead();
            showBooks();
        });

        card.appendChild(read);
        card.appendChild(deleteBtn);
        content.appendChild(card);


    })
}

showBooks();