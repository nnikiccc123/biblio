import React, {useState} from "react";
import BookSearchField from "../comps/BookSearchField";
import searchBooks from "../utils/BookApi";
import BookSearchPreview from "../comps/BookSearchPreview";


const pageSize = 8;

const status_ok = 0;
const status_downloading = 1;
const status_error = 2;


const Search = () => {
    const [searchStatus, setSearchStatus] = useState(status_ok);
    const [searchResult, setSearchResult] = useState();
    const [searchPageIndex, setSearchPageIndex] = useState(0);

    const search = (startIndex) => {
        setSearchStatus(status_downloading);
        searchBooks(window.sessionStorage.getItem("last_search_keyword"), pageSize, startIndex, json => {
            if (json) {
                setSearchStatus(status_ok);
                setSearchResult(json);
            } else {
                setSearchStatus(status_error);
            }
        });
    }

    let gotoPage = (idx) => {
        setSearchPageIndex(idx);
        search(idx * pageSize);
    }

    let keyword = window.sessionStorage.getItem("last_search_keyword");
    return (
        <div>
            <div className={"search-container"}>
                <div className="search-bar">
                    <BookSearchField searchFunc={() => gotoPage(0)} keyword={keyword} />
                </div>
                <div>
                    {
                        searchStatus === status_downloading &&
                        <span className={"search-status-message"}>Searching...</span>
                    }
                    {
                        searchStatus === status_ok &&
                        <BookSearchPreview
                            key={`bsp_${keyword}`}
                            searchResult={searchResult}
                            gotoPageFunc={gotoPage}
                            pageSize={pageSize}
                            pageIndex={searchPageIndex}
                        />
                    }
                </div>
            </div>
        </div>
    );
};

export default Search;
