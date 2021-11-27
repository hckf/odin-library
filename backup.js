"use strict";

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

// let hobbitBook = new Book('The Hobbit', 'J. R. R. Tolkien', 300, 'unread');
// console.log(hobbitBook.info());

function addBookToLibrary() {}

function addCard() {
  let bookName = document.getElementById("book-name");
  let bookAuth = document.getElementById("book-author");
  let bookPage = document.getElementById("page-number");

  if (bookName.value.length > 100 || bookAuth.value.length > 50) {
  } else {
    let newBook = new Book(
      bookName.value,
      bookAuth.value,
      bookPage.value,
      false
    );
    myLibrary.push(newBook);
    console.log(myLibrary);

    // Create new book card elements for the page
    let pageBody = document.getElementById("page-body");
    let newCard = document.createElement("div");
    let cardInfo = document.createElement("div");

    let bookTitle = document.createElement("p");
    let bookTitleText = document.createTextNode(bookName.value);
    bookTitle.appendChild(bookTitleText);

    let bookAuthor = document.createElement("p");
    let bookAuthorText = document.createTextNode("By: " + bookAuth.value);
    bookAuthor.appendChild(bookAuthorText);

    let bookPages = document.createElement("p");
    let bookPageText = document.createTextNode("Pages: " + bookPage.value);
    bookPages.appendChild(bookPageText);

    let cardButtons = document.createElement("div");
    let readButton = document.createElement("button");
    let removeButton = document.createElement("button");

    pageBody.appendChild(newCard);
    newCard.classList.add("book-card");
    newCard.appendChild(cardInfo);
    cardInfo.classList.add("card-info");
    cardInfo.appendChild(bookTitle);
    bookTitle.classList.add("book-info", "book-title");
    cardInfo.appendChild(bookAuthor);
    bookAuthor.classList.add("book-info", "book-author");
    cardInfo.appendChild(bookPages);
    bookPages.classList.add("book-info", "book-pages");
    newCard.appendChild(cardButtons);
    cardButtons.classList.add("card-btns");
    cardButtons.appendChild(readButton);
    readButton.classList.add("card-btn", "read-btn");
    let readBtnText = document.createTextNode("UNREAD");
    readButton.appendChild(readBtnText);
    readButton.addEventListener("click", function () {
      if (readButton.innerHTML == "UNREAD") {
        readButton.style.backgroundColor = "darkgreen";
        readButton.innerHTML = "READ";
      } else {
        readButton.style.backgroundColor = "#a22c29";
        readButton.innerHTML = "UNREAD";
      }
    });

    cardButtons.appendChild(removeButton);
    removeButton.classList.add("card-btn", "remove-btn");
    let removeBtnText = document.createTextNode("REMOVE");
    removeButton.appendChild(removeBtnText);
    removeButton.addEventListener("click", function () {
      removeCard(readButton);
    });

    bookName.value = "";
    bookAuth.value = "";
    bookPage.value = "";
  }
}

function readStatusChange(e) {
  if (e.innerHTML == "UNREAD") {
    e.read = true;
    e.style.backgroundColor = "darkgreen";
    e.innerHTML = "READ";
  } else {
    e.read = false;
    e.style.backgroundColor = "#a22c29";
    e.innerHTML = "UNREAD";
  }
}

function removeCard(e) {
  let bookTitle = e.parentNode.parentNode.querySelector("p");
  console.log(bookTitle);
  let bookObj = myLibrary.filter((obj) => {
    return obj.title == bookTitle.innerHTML;
  });
  console.log(bookObj);
  let bookIndex = myLibrary.findIndex((bookObj) => bookObj.title);
  // let bookIndex = myLibrary.indexOf(bookObj);
  console.log(bookIndex);
  if (bookIndex > -1) {
    myLibrary.splice(bookIndex, 1);
  }
  console.log("Books in library: " + myLibrary.length);
  // Remove book card from DOM.
  e.parentNode.parentNode.parentNode.removeChild(e.parentNode.parentNode);
  console.log("Card removed.");
}

function setupButtons() {
  // Read Status Buttons
  let readButtons = Array.from(document.getElementsByClassName("read-btn"));

  for (let button of readButtons) {
    button.addEventListener("click", function () {
      readStatusChange(button);
    });
  }

  // Remove Buttons
  let removeButtons = Array.from(document.getElementsByClassName("remove-btn"));

  for (let button of removeButtons) {
    button.addEventListener("click", function () {
      removeCard(button);
    });
  }
}

let modal = document.getElementById("modal");
let addBookBtn = document.getElementById("add-book");
let confirmAddBook = document.getElementById("confirm-add");
let closeBtn = document.getElementById("close-modal");

addBookBtn.addEventListener("click", function () {
  modal.style.display = "block";
});

confirmAddBook.addEventListener("click", function () {
  addCard();
  modal.style.display = "none";
});

closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// FUNCTION DECLARATIONS

setupButtons();
