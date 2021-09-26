import React, {useEffect, useState} from 'react';
import {wordsApi} from "../api/wordsApi";
import {ReaderWord} from "../Reader/ReaderWord";
import {v4 as uuidv4} from "uuid";
import {Paginator} from "../Paginator";

export const Book = () => {

    const localPage = localStorage.getItem('dictionary_book_page')
    const [page, setPage] = useState(localPage ? +localPage : 5);
    const [pagesCount, setPagesCount] = useState(0);
    const [words, setWords] = useState<JSX.Element[]>([]);

    useEffect(() => {
        (async () => {
            const res = await wordsApi.getBook(+page)
            setPagesCount(res.data.numpages)
            const wordsArray = res.data.text.split(' ').map((word: string) => {
                return <ReaderWord key={uuidv4()} word={word}/>
            })
            setWords(wordsArray);
        })()
    }, [page])

    const changePage = (page: number) => {
        setPage(page);
        localStorage.setItem('dictionary_book_page', page + '')
    }

    return <div className={'main-wrapper'}>
        <div className={'main-container'}>


            <div style={{marginTop: '20px'}}>
                {words}
            </div>

            <Paginator currentPage={+page} totalItems={pagesCount} changer={changePage}/>
        </div>
    </div>
}