//Book class: Represent a book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
//UI class: handleUI task
class UI{

static displayBooks(){
    const books = Store.getBooks();
    books.forEach((book)=>UI.addBookToList(book)); 
}    
//show custom alert
static showAlert(messege,ClassName){
const div = document.createElement('div');
div.className=`alert alert-${ClassName}`;
div.appendChild(document.createTextNode(messege));
const container=document.querySelector('.container');
const form = document.querySelector('#book-form');
container.insertBefore(div, form);

//vanish in 3 sec
setTimeout(()=>document.querySelector('.alert').remove(),3000)
    }
  
//clear fields after submitting book    
    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }

//Add book to the list  
  static addBookToList(book){
    const list=document.querySelector('#book-list');
    const row=document.createElement('tr');
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }
  
//delete Book  
  static deleteBook(el){
    if(el.classList.contains('delete')){
        el.parentElement.parentElement.remove();
    }
  }
};
  
  

//Store Class: Handles Storage
class Store{
static getBooks(){
let books;
if(localStorage.getItem('books')===null){
books=[];
}
else{
    books=JSON.parse(localStorage.getItem('books'));
}
return books;
}

static addBook(book){
const books=Store.getBooks();
books.push(book);
localStorage.setItem('books',JSON.stringify(books));
}

static removeBook(isbn){
const books=Store.getBooks();
books.forEach((book,index)=>{ 
    if(book.isbn==isbn)
        {
            books.splice(index,1);
        }
});

localStorage.setItem('books',JSON.stringify(books))
}
}


//Events: Add a book
var  StoreBooks=[];
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;

    if(title==''||author==''||isbn==''){
      UI.showAlert('Please fill in all fields','danger'); 
    }
    else{
        
        const book= new Book(title,author,isbn);
 

        //StoreBooks.push(book);
          Store.addBook(book);
        //add books to ui
          UI.addBookToList(book);
          //show alert
          UI.showAlert('Book added','success');
          //clear fields
          UI.clearFields();
    }
    
});


//EvEnt remove book
document.querySelector('#book-list').addEventListener('click', (e)=>{UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book removed','info'); 
});
// UI.displayBooks();
//Event:Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks());