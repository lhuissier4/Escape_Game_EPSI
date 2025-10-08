import {type JSX, useEffect, useRef, useState} from "react";
import DivSelectionWithEnter from "../components/DivSelectionWithEnter.tsx";
import {Button} from "react-bootstrap";
import {redirect, useNavigate} from "react-router-dom";

interface apiDatasFetched {
    gamecode: number;
}
const CreateAccountPage = (): JSX.Element => {
    const codeRef = useRef<HTMLInputElement>(null);
    const [apiDatas, setApiDatas] = useState<apiDatasFetched[]>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [is_valid_code, setIsValidCode] = useState(true);
    const navigate = useNavigate();
    function generateCode() {
        setIsLoading(true);

        fetch("/api/generate-code", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erreur serveur (${response.status})`);
                }
                return response.json();
            })
            .then((data) => {
                if (!data) {
                    throw new Error("Les données reçues sont vides");
                }
                setApiDatas(data);
                setServerError(null);
                navigate("/game/"+data.gamecode);
            })
            .catch((error) => {
                console.error("Erreur fetch:", error);
                setServerError(error.message || "Erreur inconnue");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        // Exemple : reset à chaque ouverture du composant
        if (codeRef.current) {
            codeRef.current.value = "";
        }
    }, []);

    function joinGame() {
        const value = codeRef.current?.value?.trim(); // retire les espaces

        // Vérifie si la valeur est un entier
        if (value && /^\d+$/.test(value)) {
            setIsValidCode(true);
            navigate("/game/"+value);
        } else {
            setIsValidCode(false);
        }
    }

    return (
        <div className="login_container">
            <div className="login_box">
                <h1>Rejoindre une partie</h1>
                <div className="form">
                    <button onClick={generateCode} style={{fontSize:"20px"}}>Générer un code</button>
                    <br/>
                    <br/>
                    <div className="search-all-block flex login">
                        <DivSelectionWithEnter onEnter={joinGame} >
                            <label htmlFor="codeNumber">Entrer un code :
                                <input name="codeNumber" ref={codeRef} type="number" placeholder="Ex: 265899"/>
                                {!is_valid_code &&
                                    <label className="error_login_message">Un code valide doit être entré</label>
                                }
                                <button onClick={joinGame}>Rejoindre une partie</button>
                            </label>

                        </DivSelectionWithEnter>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccountPage;
/*
 let jsondatas = {
            "gamecode": codeRef.current?.value
        }
        console.log("jsondatas", JSON.stringify(jsondatas));

        setIsLoading(true);
        fetch("api/join-game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsondatas)
        })
            .then(async (response) => {
                const contentType = response.headers.get("content-type");
                if (!response.ok) {
                    // On déclenche une erreur manuellement pour que le .catch soit appelé
                    const errorData = await response.json();
                    throw {status: response.status, message: errorData.detail || "Erreur inconnue"};
                }
                if (!contentType || !contentType.includes("application/json")) {
                    console.log(contentType)
                    throw {status: response.status, message: "Réponse non-JSON reçue"};
                }
                return response.json();
            })
            .then((data) => {
                if (!data){
                    throw { status: 500, message: "Les données reçues sont vides" };
                }
                setServerError(null)

            })
            .catch((error) => {
                setServerError("Erreur "+error.status+" : "+error.message);
                console.log("error "+error.status+" : "+error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
 */