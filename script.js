'use strict';

let myLibrary = [];

function Book(title, author, pages, readStatus) {
    this.title = title
    this.author = author
    this.pages = pages
    this.readStatus = readStatus
    this.unread = {
        read: 'has been read',
        unread: 'not read yet'
    }
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.unread[readStatus]}`
    }
}

// let hobbitBook = new Book('The Hobbit', 'J. R. R. Tolkien', 300, 'unread');
// console.log(hobbitBook.info());

function addBookToLibrary() {

  }


function removeCard (e) {
    console.log('Card removed.')
    e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
}

function setupRemoveButtons(className) {
    let removeButtons = Array.from(document.getElementsByClassName(className));

    for (let button of removeButtons) {
        button.addEventListener('click', function() {
            removeCard(button);
        });
    }
}

let modal = document.getElementById('modal');
let addBookBtn = document.getElementById('add-book');

addBookBtn.addEventListener('click', function() {
    modal.style.display = 'block';
});

let closeBtn = document.getElementById('close-modal');
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});



// FUNCTION DECLARATIONS

setupRemoveButtons('remove-btn')


