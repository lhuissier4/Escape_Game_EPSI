import { useParams } from "react-router-dom";
import { useState } from "react";
import type { JSX } from "react";

// Structure d'une énigme
interface Question {
    image: string;
    question: string;
    options: string[];
    correct: string;
}

function Mystery(): JSX.Element {
    const { id_mystery } = useParams<{ id_mystery: string }>();
    const [selected, setSelected] = useState<string>("");
    const [score, setScore] = useState<number>(50); // Score initial à 50
    const [isFinished, setIsFinished] = useState<boolean>(false);

    // Liste des énigmes
    const questions: Record<string, Question> = {
        "1": {
            image: "/gaz.jpg",
            question:
                "Je suis invisible, mais je piège la chaleur. Je suis produit par les voitures, les usines et la combustion du charbon. Qui suis-je ?",
            options: ["Oxygène", "Dioxyde de carbone (CO₂)", "Azote", "Vapeur d’eau"],
            correct: "Dioxyde de carbone (CO₂)"
        },
        "2": {
            image: "/arbre.jpg",
            question:
                "Quelle source d’énergie est renouvelable et ne produit pas de gaz à effet de serre ?",
            options: ["Charbon", "Pétrole", "Énergie solaire", "Gaz naturel"],
            correct: "Énergie solaire"
        },
        "3": {
            image: "/transports.jpg",
            question:
                "Quel moyen de transport émet le moins de gaz à effet de serre par passager ?",
            options: ["Voiture individuelle", "Avion", "Vélo", "Bus"],
            correct: "Vélo"
        },
        "4": {
            image: "/recyclages.png",
            question:
                "Recycler, c’est toujours bon pour la planète… ou pas ? Parmi ces affirmations, laquelle est fausse ?",
            options: [
                "Recycler consomme de l’énergie.",
                "Tous les plastiques sont recyclables.",
                "Le recyclage réduit les émissions de CO₂.",
                "Recycler permet d’économiser des ressources naturelles."
            ],
            correct: "Tous les plastiques sont recyclables."
        }
    };

    const current = questions[id_mystery || ""] ?? null;

    if (!current) {
        return <h1>Énigme introuvable</h1>;
    }

    // Fonction appelée lors de la validation
    async function handleSubmit() {
        if (selected === "") {
            alert("Veuillez sélectionner une réponse.");
            return;
        }

        if (isFinished) {
            alert("Vous avez déjà validé cette énigme.");
            return;
        }

        const isCorrect = selected === current.correct;

        if (isCorrect) {
            console.log("Bonne réponse !");
            setIsFinished(true);

            try {
                // Envoi du score au serveur
                const response = await fetch("/api/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_mystery, // rajouter id joueur
                        score,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Erreur du serveur : ${response.status}`);
                }

                console.log("Score envoyé au serveur :", score);
                alert(`Bonne réponse ! Score final : ${score} points`);
            } catch (error) {
                console.error("Erreur lors de l’envoi du score :", error);
            }

        } else {
            // Mauvaise réponse → décrémentation du score
            const newScore = Math.max(score - 5, 0); // Réduit le score sans passer sous 0
            setScore(newScore);
            console.log(`Mauvaise réponse. Score restant : ${newScore}`);
            alert("Mauvaise réponse, essayez encore !");
        }
    }

    return (
        <div className="mystery-container">
            <h1>Énigme {id_mystery}</h1>
            <p className="score-display">Score : {score}</p>

            <img src={current.image} alt="illustration" className="mystery-image" />
            <p className="mystery-question">{current.question}</p>

            <div className="mystery-options">
                {current.options.map((option) => (
                    <label key={option} className="mystery-option">
                        <input
                            type="radio"
                            name="mystery"
                            value={option}
                            checked={selected === option}
                            onChange={(e) => setSelected(e.target.value)}
                            disabled={isFinished}
                        />
                        {option}
                    </label>
                ))}
            </div>

            <button className="validate-button" onClick={handleSubmit} disabled={isFinished}>
                {isFinished ? "Terminé" : "Valider"}
            </button>
        </div>
    );
}

export default Mystery;
