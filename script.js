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

function addCard() {
  // Get info submitted through the modal window
  let bookName = document.getElementById("book-name");
  let bookAuth = document.getElementById("book-author");
  let bookPage = document.getElementById("page-number");

  // Verify submitted info length
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

    // Create new book card elements for the page from the info submitted
    let bookTitle = document.createElement("p");
    let bookTitleText = document.createTextNode(bookName.value);
    bookTitle.appendChild(bookTitleText);

    let bookAuthor = document.createElement("p");
    let bookAuthorText = document.createTextNode("By: " + bookAuth.value);
    bookAuthor.appendChild(bookAuthorText);

    let bookPages = document.createElement("p");
    let bookPageText = document.createTextNode("Pages: " + bookPage.value);
    bookPages.appendChild(bookPageText);

    // Get page-body (main container) div, create new card div
    let pageBody = document.getElementById("page-body");
    let newCard = document.createElement("div");
    pageBody.appendChild(newCard);
    newCard.classList.add("book-card");

    // Card Info and Info Container divs
    let cardInfo = document.createElement("div");
    let infoCont = document.createElement("div");
    newCard.appendChild(cardInfo);
    cardInfo.classList.add("card-info");
    cardInfo.appendChild(infoCont);
    infoCont.classList.add("info-cont");
    infoCont.appendChild(bookTitle);
    bookTitle.classList.add("book-info", "book-title");
    infoCont.appendChild(bookAuthor);
    bookAuthor.classList.add("book-info", "book-author");
    infoCont.appendChild(bookPages);
    bookPages.classList.add("book-info", "book-pages");

    // Card Buttons Div
    let cardButtons = document.createElement("div");
    newCard.appendChild(cardButtons);
    cardButtons.classList.add("card-btns");

    // Read Button
    let readButton = document.createElement("button");
    cardButtons.appendChild(readButton);
    readButton.style.backgroundColor = "#a22c29";
    readButton.classList.add("card-btn", "read-btn");
    let readBtnText = document.createTextNode("UNREAD");
    readButton.appendChild(readBtnText);
    readButton.addEventListener("click", () => readStatusChange(readButton));

    // Remove Button
    let removeButton = document.createElement("button");
    cardButtons.appendChild(removeButton);
    removeButton.classList.add("card-btn", "remove-btn");
    let removeBtnText = document.createTextNode("REMOVE");
    removeButton.appendChild(removeBtnText);
    removeButton.addEventListener("click", () => removeCard(removeButton));

    // Clear modal window values
    bookName.value = "";
    bookAuth.value = "";
    bookPage.value = "";
  }
}

function readStatusChange(e) {
  let bookTitle = e.parentNode.parentNode.querySelector("p");
  let bookObj = myLibrary.filter((e) => {
    return e.title == bookTitle.innerHTML;
  });
  let bookIndex = myLibrary.findIndex((bookObj) => bookObj.title);
  console.log(bookIndex);
  if (bookIndex > -1) {
    if (e.innerHTML == "UNREAD") {
      myLibrary[bookIndex].read = true;
      e.style.backgroundColor = "darkgreen";
      e.innerHTML = "READ";
    } else {
      myLibrary[bookIndex].read = false;
      e.style.backgroundColor = "#a22c29";
      e.innerHTML = "UNREAD";
    }
  }
  console.log(myLibrary);
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
