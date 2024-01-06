import '../App.css';
import searchBooks from "../utils/BookApi";
import {useState, createRef} from "react";

const pageSize = 10;


const BookSearchField = (props) => {
    const textInputRef = createRef();
    const [keyword, setKeyword] = useState("")

    function onChange(e){
        e.preventDefault();
        setKeyword(e.target.value);
    }

    const search = () => {
        if (props.onChange) {
            props.onChange(keyword);
        }
        props.searchFunc();
        textInputRef.current.select();
    }

    return (
        <div>
            <input
                ref={textInputRef}
                type="text"
                placeholder="Search"
                onChange={onChange}
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        search();
                    }
                }}
                value={keyword}
            />
            <button onClick={() => search()}>Traži</button>
        </div>
    );
};


const BookSearchPreview = (props) => {
    const [pageIndex, setPageIndex] = useState(0);

    if (props.searchResult && props.searchResult.totalItems) {
        let bookItems = [];
        if (props.searchResult.items) {
            for (let item of props.searchResult.items) {
                bookItems.push(
                    <div className={"book-preview-item"}>
                        <img src={item?.volumeInfo?.imageLinks?.thumbnail} height={"150px"} title={item?.volumeInfo?.subtitle || item?.volumeInfo?.title} />
                        <span>
                            {item?.volumeInfo.title.substring(0, 20)}
                        </span>
                    </div>
                )
            }
        }

        let gotoPage = (idx) => {
            setPageIndex(idx);
            props.searchFunc(idx * pageSize);
        }

        return (
            <div>
                <div>
                    Ukupno pronađeno knjiga: {props.searchResult.totalItems}
                </div>
                <div className={"book-preview-grid"}>
                    {bookItems}
                </div>
                {/*<div className={"book-preview-pagination"}>*/}
                {/*    <button onClick={() => gotoPage(pageIndex - 1)}>Prethodno</button>*/}
                {/*    &nbsp;Prikazano {pageIndex * pageSize + 1} - {(pageIndex + 1) * pageSize}&nbsp;*/}
                {/*    <button onClick={() => gotoPage(pageIndex + 1)}>Sledeće</button>*/}
                {/*</div>*/}
            </div>
        )
    } else if (props.searchResult) {
        return (
            <div>Nije pronađena ni jedna knjiga!</div>
        )
    }

    return null;
}


const Home = () => {
    const [searchResult, setSearchResult] = useState();
    const [searchKeyword, setSearchKeyword] = useState();

    const search = (pageIndex) => {
        searchBooks(searchKeyword, pageSize, pageIndex, json => setSearchResult(json));
    }

    return (
        <div>
            <h1>Naslovna strana</h1>
            <BookSearchField searchFunc={() => search(0)} onChange={v => setSearchKeyword(v)} />
            <BookSearchPreview searchResult={searchResult} searchFunc={search} />
        </div>
    );
};


export default Home;
