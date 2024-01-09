import {createRef, useEffect, useState} from "react";


const BookSearchField = (props) => {
    const textInputRef = createRef();
    const [keyword, setKeyword] = useState(props.keyword || "");

    function onChange(e) {
        e.preventDefault();
        setKeyword(e.target.value);
    }

    const search = () => {
        window.sessionStorage.setItem("last_search_keyword", keyword);
        props.searchFunc();
        textInputRef.current.select();
    }


    useEffect(() => {
        if (keyword) {
            search();
        }
    }, []);

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
            <button onClick={() => search()}>View</button>
        </div>
    );
};


export default BookSearchField;