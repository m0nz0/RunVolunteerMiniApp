export const defaultWikiPostfix: string = "redkie-roli";
export const wikiPostfix: { [key in number]: { postfix: string } } = {
    [19]: {postfix: "zamykayushhij"},
    [7]: {postfix: "marshal"},
    [13]: {postfix: "razdacha-kartochek"},
    [1]: {postfix: "rukovoditel-meropriyatiya"},
    [2]: {postfix: "sekundomer"},
    [11]: {postfix: "skaner"},
    [5]: {postfix: "fotograf"},
}

export const getPostfix = (positionId: number): string => {
    return wikiPostfix[positionId]?.postfix ?? defaultWikiPostfix;
}
