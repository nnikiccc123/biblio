import {useState} from "react";


const BookSearchPreview = (props) => {
    if (props.searchResult && props.searchResult.totalItems) {
        let bookItems = [];
        if (props.searchResult.items) {
            for (let item of props.searchResult.items) {
                let thumbUrl = item?.volumeInfo?.imageLinks?.thumbnail || "/img/nothumb.gif";
                let authorsStr = "";
                if (item?.volumeInfo?.authors && item?.volumeInfo?.authors.length > 0) {
                    for (let author of item?.volumeInfo?.authors) {
                        if (authorsStr.length > 0) {
                            authorsStr += ", ";
                        }
                        authorsStr += author;
                    }
                }

                bookItems.push(
                    <div className={"book-preview-item"}>
                        <div>
                            <img onClick={() => alert("JOJ")} src={thumbUrl} title={item?.volumeInfo?.subtitle || item?.volumeInfo?.title} />
                        </div>
                        <span className={"title"}>
                            {item?.volumeInfo.title}
                        </span>
                        {
                            item?.volumeInfo?.subtitle &&
                            <span className={"subtitle"}>{item?.volumeInfo?.subtitle}</span>
                        }
                        {
                            <span className={"authors"}>{authorsStr.length > 0 && `By ${authorsStr}`}</span>
                        }
                        {
                            item?.volumeInfo?.pageCount ? <span className={"pagecount"}>{item?.volumeInfo?.pageCount} pages</span>: null

                        }
                    </div>
                )
            }
        }

        return (
            <div>
                <div className={"book-preview-pagination"}>
                    {
                        props.pageIndex > 0 && <a onClick={() => props.gotoPageFunc(props.pageIndex - 1)}>&#8678;</a>
                    }
                    Showing books {props.pageIndex * props.pageSize + 1} - {(props.pageIndex + 1) * props.pageSize} of {props.searchResult.totalItems}
                    <a onClick={() => props.gotoPageFunc(props.pageIndex + 1)}>&#8680;</a>
                </div>
                <div className={"book-preview-grid"}>
                    {bookItems}
                </div>
            </div>
        )
    } else if (props.searchResult) {
        return (
            <span className={"search-status-message"}>No books found!</span>
        )
    }

    return null;
}


export default BookSearchPreview;