import { type JSX, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MainScene(): JSX.Element {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [solvedMysteries, setSolvedMysteries] = useState<Record<string, boolean>>({});
    let allKeysExist:boolean;
    useEffect(() => {
        // Chargement de l’état des énigmes terminées depuis le localStorage
        const solved: Record<string, boolean> = {};

        for (let i = 1; i <= 4; i++) {
            const key = `mystery_solved_${i}`;
            solved[i] = localStorage.getItem(key) === "true";
        }
        setSolvedMysteries(solved);
        allKeysExist = Array.from({ length: 4 }, (_, i) => `mystery_solved_${i + 1}`)
            .every((key) => localStorage.getItem(key) !== null);

        // /* Affiche un popup si toutes les clés sont présentes */
        if (allKeysExist) {
            window.alert("Jeu terminé ! Félicitations !");
            navigate("/home")
        }
    }, []);

    // Fonction pour naviguer uniquement si l’énigme n’est pas terminée
    function handleClick(mysteryId: string) {
        if (solvedMysteries[mysteryId]) return; // Empêche le clic
        navigate(`/game/environment/${id}/play/mystery/${mysteryId}`);
    }

    return (
        <div className="scene-container">
            <img src="/earth.jpg" alt="Earth background" className="background-image" />

            {/* Zone 1 */}
            <img
                src="/gaz.jpg"
                alt="Zone 1"
                className={`clickable-image img1 ${solvedMysteries[1] ? "disabled" : ""}`}
                onClick={() => handleClick("1")}
                style={{ cursor: solvedMysteries[1] ? "not-allowed" : "pointer", opacity: solvedMysteries[1] ? 0.5 : 1 }}
            />

            {/* Zone 2 */}
            <img
                src="/pollution.jpg"
                alt="Zone 2"
                className={`clickable-image img2 ${solvedMysteries[2] ? "disabled" : ""}`}
                onClick={() => handleClick("2")}
                style={{ cursor: solvedMysteries[2] ? "not-allowed" : "pointer", opacity: solvedMysteries[2] ? 0.5 : 1 }}
            />

            {/* Zone 3 */}
            <img
                src="/transports.jpg"
                alt="Zone 3"
                className={`clickable-image img3 ${solvedMysteries[3] ? "disabled" : ""}`}
                onClick={() => handleClick("3")}
                style={{ cursor: solvedMysteries[3] ? "not-allowed" : "pointer", opacity: solvedMysteries[3] ? 0.5 : 1 }}
            />

            {/* Zone 4 */}
            <img
                src="/recyclages.png"
                alt="Zone 4"
                className={`clickable-image img4 ${solvedMysteries[4] ? "disabled" : ""}`}
                onClick={() => handleClick("4")}
                style={{ cursor: solvedMysteries[4] ? "not-allowed" : "pointer", opacity: solvedMysteries[4] ? 0.5 : 1 }}
            />

            <div className="overlay-text">
                <h1>Escape game environnement</h1>
            </div>
        </div>
    );
}

export default MainScene;
