const STORAGE_KEY = "BOOKSHELF_APPS";

let bookshelf = [];

// Alert untuk supporting browser
const isStorageExist = () => {
  if (typeof Storage === undefined) {
    alert("Silahkan update browsermu");
    return false;
  }

  return true;
};

// Menyimpan data buku
const saveData = () => {
  const parsed = JSON.stringify(bookshelf);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
};

const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) bookshelf = data;

  document.dispatchEvent(new Event("ondataloaded"));
};

const updateDataToStorage = () => {
  if (isStorageExist()) saveData();
};

const composeBookObject = (bookTitle, bookAuthor, bookYear, bookIsComplete) => {
  return {
    id: new Date().getTime(),
    bookTitle,
    bookAuthor,
    bookYear: +bookYear,
    bookIsComplete,
  };
};

// Function untuk pencarian buku
const findBook = (bookId) => {
  for (book of bookshelf) {
    if (book.id === bookId) return book;
  }

  return null;
};

const findBookIndex = (bookId) => {
  let index = 0;
  for (book of bookshelf) {
    if (book.id === bookId) return index;

    index++;
  }

  return -1;
};

const refreshDataFromBookshelf = () => {
  const listIncompleted = document.getElementById(INCOMPLETE_BOOKSHELF_LIST_ID);
  let listCompleted = document.getElementById(COMPLETE_BOOKSHELF_LIST_ID);

  for (book of bookshelf) {
    const newBook = makeBook(book.bookTitle, book.bookAuthor, book.bookYear, book.bookIsComplete);
    newBook[BOOKSHELF_BOOK_ID] = book.id;

    if (book.bookIsComplete) {
      listCompleted.append(newBook);
    } else {
      listIncompleted.append(newBook);
    }
  }
};
