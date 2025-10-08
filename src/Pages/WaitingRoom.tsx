import {type JSX, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

const WaitingRoom = (): JSX.Element => {
    let { id } = useParams()
    let user1 = "bob2"
    let user2 = "dupuis3"
    const [apiData, setApiData] = useState<any>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    useEffect(() => {
        // Cette partie ne s'exécute qu'une seule fois, au montage du composant
        setIsLoading(true)
        fetch("/api/verify-validity-of-code?gamecode=" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                const result = await response.json();
                setApiData(result);
                setApiError(null)
            })
            .catch((err) => {
                console.error(err);
                setApiError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    function PrewiousPage () {
        navigate("/create-code")
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
                                <h2>Vous avez le code {id}</h2>
                            </div>
                            <p>Utilisateur 1 : {user1}</p>
                            <p>Utilisateur 2 : {user2}</p>
                            <button className="button-style">Démarrer la partie</button>
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