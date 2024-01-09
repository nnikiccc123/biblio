/**
 * Funkcije za pretragu knjiga
 */


const searchBooks = (keyword, maxResults, startIndex, onSearch) => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(keyword)}&printType=books&maxResults=${maxResults}&startIndex=${startIndex}`;
    console.log(url);
    fetch(url).then(
        response => response.json(), reason => console.error(reason)
    ).then(json => onSearch(json));
}


export default searchBooks;