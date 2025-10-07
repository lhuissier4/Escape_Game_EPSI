import {type JSX, useRef, useState} from "react";
import Cookies from "js-cookie";
import DivSelectionWithEnter from "../components/DivSelectionWithEnter.tsx";
import {useNavigate } from "react-router-dom";



interface apiDatasFetched {
    username: string;
    email: string;
    first_name: string;
    "last_name": string;
    image_path: string;
    access_token: string;
}

function Login(): JSX.Element {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [apiDatas, setApiDatas] = useState<apiDatasFetched[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    const redirectToCreateAccount = () => {
        navigate("/create-account"); // ✅ navigation au clic
    };

    function GetToken() {

        let jsondatas = {
            "username": usernameRef.current?.value || '',
            "password": passwordRef.current?.value || ''
        }
        console.log("jsondatas", JSON.stringify(jsondatas));

        setIsLoading(true);
        fetch("api/login", {
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
                setApiDatas(data);
                setServerError(null)

            })
            .catch((error) => {
                setServerError("Erreur "+error.status+" : "+error.message);
                console.log("error "+error.status+" : "+error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Empêche un comportement par défaut éventuel
            GetToken(); // Appelle la fonction de traitement
        }
    };
    console.log(serverError);
    if (apiDatas || Cookies.get('token') != "") {
        if (apiDatas != null){
            Cookies.set("token",apiDatas.access_token)
            location.reload();
            // les routes de App.jsx se mettent à jour dès que le cookie est enregistré
            // le /login est redirigé vers /home
        }
    }

    return (

        <div className="login_container">
            <DivSelectionWithEnter onEnter={GetToken}>
            <div className="login_box">
                <h1>Connectez-vous</h1>
                <div className="form">
                    <div className="search-all-block flex login">
                        <label htmlFor="username">Nom d'utilisateur :
                            <input name="username" ref={usernameRef} type="text" placeholder="Ex: durand33"/>
                        </label>


                        <label htmlFor="password">Mot de passe :
                            <div className="password-input">
                                <input
                                    id="password"
                                    name="password"
                                    ref={passwordRef}
                                    type={visible ? "text" : "password"}
                                    placeholder="Ex: motdepasse"
                                    className=""
                                />

                                <button
                                    type="button"
                                    onClick={() => setVisible(!visible)}
                                    className="overlay-button"
                                    aria-label="Afficher ou masquer le contenu"
                                >
                                    {visible ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </label>
                        {serverError != null && (
                            <label className="error_login_message" htmlFor="api-datas">Échec de l'authentification</label>
                        )}


                    </div>

                    <button onClick={GetToken}>Se connecter</button>
                    <button onClick={redirectToCreateAccount}>Créer un compte</button>
                </div>
            </div>
            </DivSelectionWithEnter>
        </div>

    )


}

export default Login;