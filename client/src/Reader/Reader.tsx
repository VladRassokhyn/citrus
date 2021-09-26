import React, {ChangeEvent, useState} from 'react';
import s from './Reader.module.css';
import {v4 as uuidv4} from 'uuid';
import {ReaderWord} from "./ReaderWord";
import { Link } from 'react-router-dom';

export const Reader = () => {

    const [inputValue, setInputValue] = useState('');
    const [words, setWords] = useState<JSX.Element[]>([])


    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = () => {
        const wordsArray = inputValue.split(' ').map(word => {
            return <ReaderWord key={uuidv4()} word={word}/>
        })
        setWords(wordsArray);
    }

    return <div className={'main-wrapper'}>
        <div className={'main-container'}>
            <Link to={'/book'}><button className={s.btn2}>Open the book</button></Link>
            <h3 className={s.orTitle}>Or input text</h3>
            <div className={s.inputWrapper}>
                <input value={inputValue} onChange={handleChangeInputValue}/>
                <button className={s.btn} onClick={handleSubmit}>OK</button>
            </div>
            <div style={{marginTop: '20px'}}>
                {words}
            </div>
        </div>
    </div>
}