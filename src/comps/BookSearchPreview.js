import {useState} from "react";


const BookSearchPreview = (props) => {
    const [pageIndex, setPageIndex] = useState(0);

    if (props.searchResult && props.searchResult.totalItems) {
        let bookItems = [];
        if (props.searchResult.items) {
            for (let item of props.searchResult.items) {
                bookItems.push(
                    <div className={"book-preview-item"}>
                        <img onClick={() => alert("JOJ")} src={item?.volumeInfo?.imageLinks?.thumbnail} height={"150px"} title={item?.volumeInfo?.subtitle || item?.volumeInfo?.title} />
                        <span>
                            {item?.volumeInfo.title.substring(0, 20)}
                        </span>
                    </div>
                )
            }
        }

        let gotoPage = (idx) => {
            setPageIndex(idx);
            props.searchFunc(idx * props.pageSize);
        }

        return (
            <div>
                <div>
                    Ukupno pronađeno knjiga: {props.searchResult.totalItems}
                </div>
                <div className={"book-preview-grid"}>
                    {bookItems}
                </div>
                <div className={"book-preview-pagination"}>
                    <button onClick={() => gotoPage(pageIndex - 1)}>Prethodno</button>
                    &nbsp;Prikazano {pageIndex * props.pageSize + 1} - {(pageIndex + 1) * props.pageSize}&nbsp;
                    <button onClick={() => gotoPage(pageIndex + 1)}>Sledeće</button>
                </div>
            </div>
        )
    } else if (props.searchResult) {
        return (
            <div>Nije pronađena ni jedna knjiga!</div>
        )
    }

    return null;
}


export default BookSearchPreview;