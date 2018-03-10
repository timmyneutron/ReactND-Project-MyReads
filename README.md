# Udacity React Nanodegree

# Project #1: MyReads Web App

## Introduction

This is a project for Udacity's React Nanodegree. It's a web app that displays books in three different "shelves," based on categories given by the user. It also allows the user to make a requests to an external API to search for books and add them to the app.

## Concepts

- React, React Router, Node, Yarn, JSX
- Composition
- State management
- Props and prop types
- Lifecycle events
- Rendering UI based on external data

## Getting Started
To start up the app:

- [Install npm](https://docs.npmjs.com/getting-started/installing-node)
- Download/clone the repository
- To install dependencies, navigate to the root directory of the project and execute:

```
$ npm install
```
- To run the app, navigate to the root directory of the project and execute:

```
$ npm start
```
- A web browser should pop up showing the app. If not, open a web browser and navigate to ```http://localhost:3000/```.

Using the app:

- Books are displayed on shelves according to their "shelf" properties. To change the shelf property of a book, click that book's green triangle icon and select another shelf, or select "none" to remove the book from the app. As soon as you do, the app will reload the bookshelves with all the books in the right place.
- To add books to the app, click the green plus icon on the bottom right corner of the window, or enter the URL ```http://localhost:3000/search```.
- You can search for books using the search terms below, and books fitting your search will appear below the search bar. To add a book to the bookshelf, click its green arrow icon and select a shelf from the pop up menu.
- Search results are also reflected in the URL query parameter ```q```, so searches can be shared by sharing the URL. For example, a search for "artificial intelligence" can be shared with the URL ```http://localhost:3000/search?q=artificial%20intelligence```.

## Search Terms
'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'