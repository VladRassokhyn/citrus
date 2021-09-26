import React, {useEffect, useRef, useState} from 'react';
import s from './Reader.module.css'
import {googleApi} from "../api/googleApi";
import styled, {keyframes} from "styled-components";
import {zoomIn} from "react-animations";
import {wordsApi} from "../api/wordsApi";


const ZoomInAnimation = keyframes`${zoomIn}`;
const ZoomInDiv = styled.div`
  animation: forwards .3s ${ZoomInAnimation};
`;


type Props = {
    word: string
}

export const ReaderWord = (props: Props) => {

    const {word} = props;
    const [translations, setTranslations] = useState<{ translatedText: string }[] | null>(null);
    const wordRef = useRef<HTMLHeadingElement>(null);
    const [fetchingTranslate, setFetchingTranslate] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    let formattedWord: string[] = [];
    word.split('').forEach((w, i) => {
        if(w.search(/[^A-Za-z0-9\s]/) === -1 || i === word.length - 1){
            formattedWord.push(w)
        }
    })
    formattedWord.join(',')

    const getMarginLeft = (width: number, left: number) => {
        if (width + left > document.documentElement.clientWidth){
            return - (width + left - document.documentElement.clientWidth) - 20
        } else {
            return 0
        }
    }
    const preWidth = translations ? translations[0].translatedText.length * 13 : 0;
    const spanWidth = preWidth < 170 ? 170 : preWidth
    //const spamLeftMargin = wordRef.current ? (wordRef.current.offsetWidth / 2 - (spanWidth / 2 + 18) ) : '0'
    const spanStyle = {
        marginTop: '-30px',
        marginLeft: wordRef.current ? getMarginLeft(spanWidth, wordRef.current.offsetLeft) : 0,
        width: spanWidth
    }

    useEffect(() => {
        if (isAdded) {
            setTimeout(() => {
                setIsAdded(false);
            }, 1500)
        }
    }, [isAdded])

    const handleAddWord = () => {
        (async () => {
            if (translations) {
                const res = await wordsApi.postWord({ru: translations[0].translatedText, eng: formattedWord.join('')})
                if (res.status === 200) {
                    setIsAdded(true)
                }
            }
        })();
    }

    useEffect(() => {
        if (fetchingTranslate) {
            (async () => {
                const {data} = await googleApi.getTranslate(formattedWord.join(''), 'en-ru');
                if (data.data.translations) {
                    setTranslations(data.data.translations)
                } else (
                    setTranslations([{translatedText: 'no results'}])
                )
            })()
            setFetchingTranslate(false)
        }
    }, [fetchingTranslate, word])

    const handleFetchTranslate = () => {
        setFetchingTranslate(true);
        setIsShow(pre => !pre)
    }

    return <h6
        ref={wordRef}
        style={{color: isShow ? 'red' : 'black'}}
        className={s.singleWord}
        onClick={handleFetchTranslate}
    >
        {isShow && <ZoomInDiv>
            <span
                style={spanStyle}
                className={s.translation}
            >{translations && translations[0].translatedText}<h4 onClick={handleAddWord}>ADD</h4></span>
        </ZoomInDiv>}
        {formattedWord}
        {isAdded && <span className={s.notifi}>added</span>}
    </h6>
}