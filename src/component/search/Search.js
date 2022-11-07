import React, { useState } from "react";

const baseUrl = "http://openlibrary.org";

export function searchBooks(query) {
    if (query === ''){
        return '';
    }

    const url = new URL(baseUrl + '/search.json');
    url.searchParams.append('title', query);
    console.log(fetch(url).then(response => response.json()))

    return fetch(url).then(response => response.json());
}





const Search = () => {

    const [result , setresult] = useState(0);

    const handleSearch = event =>{
        searchBooks(event.target.value).then(response => {
            setresult(response.docs);
           
          });

    }

    const resultList = (result || [] ).map((book) =>
  <tr key={book.key}>
    <td>{book.title}</td>
    <td>{book.author_name && book.author_name.join(', ')}</td>
    <td>{book.first_publish_year}</td>
  </tr>
);

    

    return (
        <div>
            <div className="search-input">
                <input type="text" placeholder = "Search" onChange={handleSearch} />
            </div>
            <h1 className="h1">Search Results</h1>

            <div className="books">
                <table>
                    <thead>
                        <tr>
                            <th className="title-col">Title</th>
                            <th className="author-col">Author</th>
                            <th className="year-col">Pub Year</th>
                            <th></th>
                        </tr>
                    </thead>
                  <tbody>{resultList}</tbody>
                </table>
            </div>
        </div>
    );
}

export default Search;