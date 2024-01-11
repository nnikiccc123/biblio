import {createRef, useEffect, useState} from "react";


const BookSearchField = (props) => {
    const textInputRef = createRef();
    const titleInputRef = createRef();
    const authorInputRef = createRef();
    const publisherInputRef = createRef();
    const [keyword, setKeyword] = useState(props.keyword || "");
    const [advanced, setAdvanced] = useState(false);

    function onChange(e) {
        e.preventDefault();
        setKeyword(e.target.value);
    }

    const search = () => {
        window.sessionStorage.setItem("advanced_search", advanced);
        if (advanced) {
            window.sessionStorage.setItem("last_search_title", titleInputRef.current.value);
            window.sessionStorage.setItem("last_search_author", authorInputRef.current.value);
            window.sessionStorage.setItem("last_search_publisher", publisherInputRef.current.value);
        } else {
            window.sessionStorage.setItem("last_search_keyword", keyword);
        }
        props.searchFunc();
        if (advanced) {
            textInputRef.current?.select();
        }
    }

    const onKeyDown = e => {
        if (e.key === "Enter") {
            search();
        }
    };

    return (
        <div className={"book-search"}>
            {
                !advanced &&
                <>
                    <input
                        ref={textInputRef}
                        type="text"
                        placeholder="Search"
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={keyword}
                    />
                    <button onClick={() => search()}>Search</button>
                    {
                        props.showAdvanced &&
                        <a onClick={() => {
                            setAdvanced(true);
                        }}>Advanced Search</a>
                    }
                </>
            }
            {
                advanced &&
                <>
                    <input ref={titleInputRef} type="text" placeholder="Title" onKeyDown={onKeyDown} defaultValue={window.sessionStorage.getItem("last_search_title")}/>
                    <input ref={authorInputRef} type="text" placeholder="Author" onKeyDown={onKeyDown} defaultValue={window.sessionStorage.getItem("last_search_author")}/>
                    <input ref={publisherInputRef} type="text" placeholder="Publisher" onKeyDown={onKeyDown} defaultValue={window.sessionStorage.getItem("last_search_publisher")}/>
                    <button onClick={() => search()}>Search</button>
                    {
                        props.showAdvanced &&
                        <a onClick={() => {
                            setAdvanced(false);
                        }}>Simple Search</a>
                    }
                </>
            }
        </div>
    );
};


export default BookSearchField;