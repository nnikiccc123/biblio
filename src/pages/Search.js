import React, {useState} from "react";
import BookSearchField from "../comps/BookSearchField";
import searchBooks from "../utils/BookApi";
import BookSearchPreview from "../comps/BookSearchPreview";


const pageSize = 10;

const status_ok = 0;
const status_downloading = 1;
const status_error = 2;


const Search = () => {
    const [searchStatus, setSearchStatus] = useState(status_ok);
    const [searchResult, setSearchResult] = useState();

    const search = (pageIndex) => {
        setSearchStatus(status_downloading);
        searchBooks(window.sessionStorage.getItem("last_search_keyword"), pageSize, pageIndex, json => {
            if (json) {
                setSearchStatus(status_ok);
                setSearchResult(json);
            } else {
                setSearchStatus(status_error);
            }
        });
    }

    let keyword = window.sessionStorage.getItem("last_search_keyword");
    return (
        <div>
            <div>
                <BookSearchField searchFunc={() => search(0)} keyword={keyword} />
            </div>
            <div>
                {
                    searchStatus === status_downloading &&
                    <span>Searching...</span>
                }
                {
                    searchStatus === status_ok &&
                    <BookSearchPreview key={`bsp_${keyword}`} searchResult={searchResult} searchFunc={search} pageSize={pageSize} />
                }
            </div>
        </div>
    );
};

export default Search;
