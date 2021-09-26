import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Word} from "../lib/types";
import s from './Word.module.css'
import classNames from "classnames";
import trashIco from '../static/trash.svg';
import {wordsApi} from "../api/wordsApi";
import styled, {keyframes} from "styled-components";
import {flipInY} from "react-animations";

const FlipInYAnimation = keyframes`${flipInY}`;
const FlipInYDiv = styled.div`
  animation: forwards .5s ${FlipInYAnimation};
`;

type Props = {
    word: Word
    setUpdateWords: Dispatch<SetStateAction<boolean>>
    viewAllTranslations: boolean
    viewAllNatives: boolean
}

export const SingleWord = (props: Props) => {
    const {word, setUpdateWords, viewAllTranslations, viewAllNatives} = props;
    const [isEditMode, setIsEditMode] = useState(false);
    const [viewTranslations, setViewTranslations] = useState(viewAllTranslations)
    const [viewNatives, setViewNatives] = useState(viewAllNatives)

    useEffect(() => {
        setViewTranslations(viewAllTranslations);
        setViewNatives(viewAllNatives)
    }, [viewAllTranslations, viewAllNatives])

    const editWrapperClasses = classNames({
        [s.editWrapperOpen]: isEditMode,
        [s.editWrapper]: true
    })

    const eng = word.eng.toLowerCase().split('')[0].toUpperCase() + word.eng.toLowerCase().split('').splice(1, word.eng.length - 1).join('');
    const ru = word.ru.toLowerCase().split('')[0].toUpperCase() + word.ru.toLowerCase().split('').splice(1, word.ru.length - 1).join('');

    const handleChangeEditMode = () => {
        setIsEditMode(prev => !prev)
    }

    const handleChangeTranslationsViewMode = () => {
        if (!viewNatives){
            setViewNatives(pre => !pre)
        }
        setViewTranslations(pre => !pre)
    }
    const handleChangeNativesViewMode = () => {
        if (!viewTranslations){
            setViewTranslations(pre => !pre)
        }
        setViewNatives(pre => !pre)
    }

    const handleDelete = () => {
        (async () => {
            await wordsApi.deleteWord(word.id);
            setUpdateWords(true)
        })()
    }

    return <div className={s.wrapper}>
        <div className={s.container}>
            <h1 onClick={handleChangeNativesViewMode}>{viewNatives ? <FlipInYDiv>{eng}</FlipInYDiv> : '********'}</h1>
            <div onClick={handleChangeEditMode} style={{width: '100%', height: '28px'}}/>
            <h2 onClick={handleChangeTranslationsViewMode}>{viewTranslations ? <FlipInYDiv>{ru}</FlipInYDiv> : '********'}</h2>
        </div>
        <div className={editWrapperClasses}>
            {isEditMode && <>
                <img
                    onClick={handleDelete}
                    className={s.showTrash}
                    src={trashIco}
                    alt={'trash icon'}
                />
            </>}
        </div>
    </div>
}