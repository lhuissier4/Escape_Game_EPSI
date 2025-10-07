

export function isDateRangeValid(jsonfile: Record<string, string>, prefix: string): boolean {
    const matchingKeys = Object.keys(jsonfile).filter(key => key.startsWith(prefix));

    // Aucune clé : on ignore, c’est valide
    if (matchingKeys.length === 0) return true;

    // Il faut exactement une paire (__Start et __End)
    if (matchingKeys.length !== 2) return false;

    const startKey = matchingKeys.find(key => key.endsWith('__Start'));
    const endKey = matchingKeys.find(key => key.endsWith('__End'));

    // Nommage incorrect ou incomplet
    if (!startKey || !endKey) return false;

    const startValue = jsonfile[startKey];
    const endValue = jsonfile[endKey];

    // Une seule date remplie → erreur
    if (!startValue && !endValue) return true;
    if (!startValue || !endValue) return false;

    const startDate = new Date(startValue);
    const endDate = new Date(endValue);

    // Dates invalides
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return false;

    // Vérifie l’ordre
    return startDate <= endDate;
}



export const getStyleOfDateFields = (isCorrect:boolean):string[] =>{

    if (isCorrect) {
        return ["#efeef4","#000000"]
    }
    return ["#ff4400","#ff4400"]
    // ["bordure input","couleur texte"]
}
