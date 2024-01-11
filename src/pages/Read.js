import React, {useEffect} from "react";
import {useNavigate, useNavigation} from "react-router-dom";

const Read = (params) => {
    const loadId = new URLSearchParams(window.location.search).get("book");

    const canRead = loadId && window.google?.books?.DefaultViewer;

    useEffect(() => {
        if (canRead) {
            let newViewer = new window.google.books.DefaultViewer(document.getElementById('book-view-container'));
            newViewer.load(loadId);
        }
    }, []);

    let navigate = useNavigate();
    return (
        <div className={"book-view-container"} >
            <div className={"book-view-header"}>
                <a onClick={() => navigate("/search")}>Back to Search</a>
            </div>
            {
                canRead && <div id={"book-view-container"} style={{height: "100%"}}/>
            }
            {
                !canRead &&
                <div style={{height: "100%", display: "flex", border: "red 3px solid", justifyContent: "center", alignItems: "center"}}>
                    Cannot read this book!
                </div>
            }
        </div>
    );
};

export default Read;
