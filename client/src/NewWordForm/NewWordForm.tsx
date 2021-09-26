import React, {ChangeEvent, useState} from 'react';
import s from './NewWordForm.module.css';
import {googleApi} from "../api/googleApi";
import {wordsApi} from "../api/wordsApi";
import classNames from "classnames";

type Props = {
    update: (value: boolean) => void
}

export const NewWordForm = (props: Props) => {

    const {update} = props
    const [inputValue, setInputValue] = useState<string>('')
    const [translations, setTranslations] = useState<{ translatedText: string }[] | null>(null)
    const [showResult, setShowResult] = useState<boolean>(false);

    const resultClasses = classNames({
        [s.result]: true,
        [s.show]: showResult,
    })

    const handleClear = () => {
        setInputValue('');
        setShowResult(false);
        setTranslations(null);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleFetch = () => {
        setShowResult(true);
        (async () => {
            const {data} = await googleApi.getTranslate(inputValue, 'en-ru');
            if (data.data.translations) {
                setTranslations(data.data.translations)
            } else (
                setTranslations([{translatedText: 'no results'}])
            )
        })()
    }

    const handleAdd = (newWord: string) => {
        (async () => {
            const res = await wordsApi.postWord({ru: newWord, eng: inputValue})
            if (res.status === 200) {
                update(true)
            }
        })();
        setInputValue('');
        handleClear();
    }

    return <div className={s.wrapper}>
        <div className={s.inputWrapper}>
            <input
                className={s.input}
                value={inputValue}
                onChange={handleChange}
            />
            <button
                className={s.addButton}
                onClick={handleFetch}
            >Translate
            </button>
        </div>

        <div className={resultClasses}>
            {showResult && <>
                <div className={s.leftSide}>
                    {translations && translations.map(translation => {
                        return <div key={translation.translatedText} className={s.resultItem}>
                            <h1
                                onClick={() => handleAdd(translation.translatedText)}
                            >{translation.translatedText}</h1>
                        </div>
                    })}
                </div>
                <div className={s.rightSide} onClick={handleClear}>
                    <h1>CLEAR</h1>
                </div>
            </>}
        </div>


    </div>
}