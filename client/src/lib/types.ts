export interface Word {
    id: string;
    ru: string;
    eng: string;
    comment: string
}

export type TranslateResponse = {
    data: {
        data: {
            translations: {translatedText: string}[]
        }
    }
}