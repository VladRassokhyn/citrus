import React, {useEffect, useState} from 'react';
import {Word} from "../lib/types";
import {wordsApi} from "../api/wordsApi";
import {NewWordForm} from '../NewWordForm/NewWordForm';
import {SingleWord} from '../Word/Word';
import s from './Dictionary.module.css';

export const Dictionary = () => {

    const [words, setWords] = useState<Word[]>([])
    const [updateWords, setUpdateWords] = useState<boolean>(true);
    const [viewAllTranslations, setViewAllTranslations] = useState(false)
    const [viewAllNatives, setViewAllNatives] = useState(true)

    useEffect(() => {
        if (updateWords) {
            (async () => {
                const res = await wordsApi.getWords();
                if (res) setWords(res.data)
            })()
            setUpdateWords(false)
        }
    }, [updateWords])

    const handleViewAllTranslations = () => {
        if (!viewAllNatives) {
            setViewAllNatives(pre => !pre)
        }
        setViewAllTranslations(pre => !pre)
    }
    const handleViewAllNatives = () => {
        if (!viewAllTranslations) {
            setViewAllTranslations(pre => !pre)
        }
        setViewAllNatives(pre => !pre)
    }

    return (
        <>

            <div className={'main-wrapper'}>
                <div className={'main-container'}>
                    <NewWordForm update={setUpdateWords}/>
                    <div className={s.buttons}>
                        <button
                            onClick={handleViewAllNatives}
                            className={viewAllTranslations ? s.btnActive : s.btnShow}
                        >Show/hide natives
                        </button>
                        <button
                            onClick={handleViewAllTranslations}
                            className={viewAllNatives ? s.btnActive : s.btnShow}
                        >Show/hide translations
                        </button>
                    </div>
                    {words.map(word => <SingleWord
                        key={word.id}
                        word={word}
                        viewAllTranslations={viewAllTranslations}
                        viewAllNatives={viewAllNatives}
                        setUpdateWords={setUpdateWords}
                    />)}
                </div>
            </div>
        </>
    );
}
