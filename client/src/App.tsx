import React from 'react';
import {Header} from "./Header/Header";
import {Route} from "react-router";
import {Dictionary} from "./Dictionary/Dictionary";
import {Reader} from "./Reader/Reader";
import {Book} from "./Book/Book";

export const App = () => {
    return <>
        <Header/>
        <Route exact path={'/'} render={() => <Dictionary/>}/>
        <Route exact path={'/reader'} render={() => <Reader/>}/>
        <Route exact path={'/book'} render={() => <Book/>}/>
    </>
}