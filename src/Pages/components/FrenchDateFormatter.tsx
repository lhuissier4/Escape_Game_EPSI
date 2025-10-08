// Conversion UTC → heure de Paris sans dépendance externe

import React from 'react';

type FrenchDateProps = {
    utcDate?: string|null;
};

const FrenchDateFormatter: React.FC<FrenchDateProps> = ({ utcDate }) => {
    if (!utcDate) return null; // Ne rien rendre si la date est absente ou invalide

    const formattedDate = getFormattedDateInParis(utcDate);
    return <>{formattedDate}</>;
};
export default FrenchDateFormatter;


const getParisOffset = (date: Date): number => {
    // On récupère l'heure locale en France pour détecter l'heure d'été
    const jan = new Date(date.getFullYear(), 0, 1).getTimezoneOffset();
    const jul = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    const maxOffset = Math.max(jan, jul); // Heure d'hiver : UTC+1 → offset -60
    const currentOffset = date.getTimezoneOffset();

    // Si l'offset actuel est inférieur au maximum, on est en heure d'été
    return currentOffset < maxOffset ? 2 : 1;
};

export const getFormattedDateInParis = (utcString: string): string => {
    const utcDate = new Date(utcString);
    const offsetHours = getParisOffset(utcDate);

    // On ajoute le décalage horaire (en ms)
    const parisTime = new Date(utcDate.getTime() + offsetHours * 60 * 60 * 1000);

    // Formatage manuel en français
    return parisTime.toLocaleString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};