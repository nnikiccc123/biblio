import React, {useEffect} from "react";
import {useNavigate, useNavigation} from "react-router-dom";
import UserUtil from "../utils/UserUtil";
import getUser from "../utils/UserUtil";

const Read = (params) => {
    const loadId = new URLSearchParams(window.location.search).get("book");

    let user = getUser();
    const canRead = user && loadId && window.google?.books?.DefaultViewer;

    useEffect(() => {
        if (canRead) {
            let newViewer = new window.google.books.DefaultViewer(document.getElementById('book-view-container'));
            newViewer.load(loadId);
        }
    }, []);

    let navigate = useNavigate();

    if (!user) {
        return (
            <div className={"book-view-notloggedin"}>
                You are not logged in! <a onClick={() => navigate("/login")}>Login</a> to read the book.
            </div>
        )
    } else {
        return (
            <div className={"book-view-container"}>
                <div className={"book-view-header"}>
                    <a onClick={() => navigate("/search")}>Back to Search</a>
                </div>
                {
                    canRead && <div id={"book-view-container"} style={{height: "100%"}}/>
                }
                {
                    !canRead &&
                    <div style={{
                        height: "100%",
                        display: "flex",
                        border: "red 3px solid",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        Cannot read this book!
                    </div>
                }
            </div>
        );
    }
};

export default Read;
