import {type JSX, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const WaitingRoom = (): JSX.Element => {
    const { id } = useParams()
    /* *** à récupérer de l'api *** */
    let user1 = "bob2"
    let user2 = "dupuis3"
    /* ********************** */
    const [apiData, setApiData] = useState<any>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    useEffect(() => {
        // Exécuté une seule fois au montage du composant
        setIsLoading(true);

        // Corps JSON attendu par le backend
        const payload = { gamecode: id };

        fetch("/api/games/join-game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then(async (response) => {
                if (!response.ok) {
                    // Gestion d'erreur HTTP
                    const errData = await response.json().catch(() => ({}));
                    throw new Error(errData.error || `Erreur HTTP : ${response.status}`);
                }
                const result = await response.json();
                console.log("Réponse join-game :", result);
                setApiData(result);
                setApiError(null);
            })
            .catch((err) => {
                console.error("Erreur API join-game :", err);
                setApiError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    function PrewiousPage () {
        navigate("/create-code")
    }
    function LaunchGame(){
        navigate("/game/environment/"+id+"/play")
    }
    return (
        <div className="defaultPage">
            <div className="sizedPage">

                <div className="txt-align-center txt-style">
                    {isLoading &&
                        <>
                            <div className="title">
                                <h1>Salle d'attente</h1>
                                <h2>Vous avez le code {id}</h2>
                            </div>
                            <p>En attente de l'API...</p>
                        </>

                    }
                    {!isLoading && !apiError ? (
                        <>
                            <div className="title">
                                <h1>Salle d'attente</h1>
                                <h2>Le code de jeu est {id}</h2>
                            </div>
                            <p>Utilisateur 1 : {user1}</p>
                            <p>Utilisateur 2 : {user2}</p>
                            <button onClick={LaunchGame} className="button-style">Démarrer la partie</button>
                        </>
                    ) : (
                        <>
                            <div className="title">
                                <h1>Salle d'attente</h1>
                                <h2>Le code {id} est invalide</h2>
                            </div>
                            <button onClick={PrewiousPage} className="button-style" style={{width:"200px"}}>Retour</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
export default WaitingRoom;