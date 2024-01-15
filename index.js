const apiUrl = 'https://65a35eb6a54d8e805ed390d2.mockapi.io/booklibrary/books';

$(document).ready(function() {
    // Initial display of existing books
    fetchBooks();

    // Function to fetch all books from the API linked above
    function fetchBooks() {
        $.ajax({
            type: 'GET',
            url: apiUrl,
            success: function(response) {
                displayBooks(response.reverse()); // Display books in reverse order (most recent on top)
            },
            error: function(error) {
                console.error('Error fetching books:', error);
            }
        });
    }

    // Function to add a new book
    window.addBook = function() {
        const title = $('#new-book-name').val();
        const author = $('#new-book-author').val();
        const date = $('#new-book-date').val();
        const synopsis = $('#new-book-synopsis').val();
        const rating = $('#new-book-rating').val();

        const newBook = {
            title: title,
            author: author,
            date: date,
            synopsis: synopsis,
            rating: rating
        };

        // Use AJAX to post the new book to the API
        $.ajax({
            type: 'POST',
            url: apiUrl,
            data: newBook,
            success: function(response) {
                fetchBooks(); // Refresh the displayed books after adding a new one
            },
            error: function(error) {
                console.error('Error adding book:', error);
            }
        });
    }

    // Function to update book details
    window.updateBook = function() {
        console.log('Update button clicked');

        const id = $('#update-book-id').val();
        const title = $('#update-book-title').val();
        const author = $('#update-book-author').val();
        const date = $('#update-book-date').val();
        const synopsis = $('#update-book-synopsis').val();
        const rating = $('#update-book-rating').val();

        const updatedBook = {
            title: title,
            author: author,
            date: date,
            synopsis: synopsis,
            rating: rating
        };

        console.log('Updated Book:', updatedBook);

        // Use AJAX to update the book details in the API
        $.ajax({
            type: 'PUT',
            url: apiUrl + '/' + id,
            data: updatedBook,
            success: function(response) {
                console.log('Update success:', response);
                $('#updateModal').modal('hide'); // Hide the modal after updating
                fetchBooks(); // Refresh the displayed books after updating
            },
            error: function(error) {
                console.error('Error updating book:', error);
            }
        });
    }

    // Function to open the update modal and populate with current book details
    window.openUpdateModal = function(id, title, author, date, synopsis, rating) {
        $('#update-book-id').val(id);
        $('#update-book-title').val(title);
        $('#update-book-author').val(author);
        $('#update-book-date').val(date);
        $('#update-book-synopsis').val(synopsis);
        $('#update-book-rating').val(rating);
        $('#updateModal').modal('show');
    }

    // Function to delete a book
    window.deleteBook = function(id) {
        // Use AJAX to delete the book from the API
        $.ajax({
            type: 'DELETE',
            url: apiUrl + '/' + id,
            success: function(response) {
                fetchBooks(); // Refresh the displayed books after deleting one
            },
            error: function(error) {
                console.error('Error deleting book:', error);
            }
        });
    }

    // Function to display all books
    function displayBooks(books) {
        let bookList = '';
        books.forEach(function(book) {
            bookList += `<div class="col-md-4 mb-3">
                            <div class="card text-white bg-success";
                    style="max-width: 20rem;">
                                <div class="card-header">${book.title}</div>
                                <div class="card-body">
                                    <h4 class="card-title">Author: ${book.author}</h4>
                                    <p class="card-text">Date Read: ${book.date}</p>
                                    <p class="card-text">Synopsis: ${book.synopsis}</p>
                                    <p class="card-text">Rating: ${book.rating}</p>
                                    <button type="button" class="btn btn-dark" onclick="deleteBook(${book.id})">Delete</button>
                                    <button type="button" class="btn btn-light" onclick="openUpdateModal(${book.id}, '${book.title}', '${book.author}', '${book.date}', '${book.synopsis}', '${book.rating}')">Update</button>
                                </div>
                            </div>
                          </div>`;
        });

        $('#app').html(bookList);
    }
});