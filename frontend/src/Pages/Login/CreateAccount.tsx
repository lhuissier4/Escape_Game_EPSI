import {type JSX, useEffect, useRef, useState} from "react";
import DivSelectionWithEnter from "../components/DivSelectionWithEnter.tsx";
import {Button} from "react-bootstrap";

const CreateAccountPage = (): JSX.Element => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef1 = useRef<HTMLInputElement>(null);
    const passwordRef2 = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const firstnameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [passwordsMatch,setPasswordsMatch] = useState(true);
    const [apiDatas, setApiDatas] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
    };
    const createAccount = async () => {

        if (!passwordsMatch){
            console.log("Les mots de passe ne correspondent pas");
            console.log("password1 =",passwordRef1.current?.value || '');
            console.log("password2 =",passwordRef2.current?.value || '');
        } else {
            const formData = new FormData();
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            formData.append("username", usernameRef.current?.value );
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            formData.append("password", passwordRef1.current?.value );
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            formData.append("name", nameRef.current?.value );
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            formData.append("firstname", firstnameRef.current?.value );
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            formData.append("email", emailRef.current?.value );

            if (file) {
                formData.append("picture", file);
            }
            setIsLoading(true);
            try {
                const res = await fetch("/api/create-account", {
                    method: "POST",
                    body: formData,
                });
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Erreur ${res.status}: ${text}`);
                }

                const data = await res.json();
                    console.log(`Téléversement réussi: ${data.picture_url || "aucune image"}`);
            } catch (err: any) {
                console.log(err.message);
            } finally
            {
                setIsLoading(false);
            }
        }

    };
    return (
        <>

            <div className="login_container">
                <DivSelectionWithEnter onEnter={createAccount}>
                    <div className="login_box">
                        <h1>Créer un compte</h1>
                        <div className="form">
                            <div className="search-all-block flex login">
                                <label htmlFor="username">Nom d'utilisateur :
                                    <input name="username" ref={usernameRef} type="text" placeholder="Ex: durand33"/>
                                </label>
                                <label htmlFor="name">Nom :
                                    <input name="name" ref={nameRef} type="text" placeholder="Ex: Dupond"/>
                                </label>
                                <label htmlFor="firstname">Prénom :
                                    <input name="firstname" ref={firstnameRef} type="text" placeholder="Ex: John"/>
                                </label>
                                <label htmlFor="email">Email :
                                    <input name="email" ref={emailRef} type="text" placeholder="Ex: john.doe@example.com"/>
                                </label>
                                <label htmlFor="image">Ajouter une photo (facultatif) :
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                </label>


                                <label htmlFor="password1">Mot de passe :
                                    <div className="password-input">
                                        <input
                                            id="password1"
                                            name="password1"
                                            ref={passwordRef1}
                                            type={visible1 ? "text" : "password"}
                                            placeholder="Ex: motdepasse"
                                            style={{ borderColor: passwordsMatch  ? "#efeef4" : "red"

                                            }}
                                            className=""
                                            onChange={() => {
                                                const p1 = passwordRef1.current?.value || "";
                                                const p2 = passwordRef2.current?.value || "";
                                                setPasswordsMatch(p1 === p2);
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setVisible1(!visible1)}
                                            className="overlay-button"
                                            aria-label="Afficher ou masquer le contenu"
                                        >
                                            {visible1 ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                    </div>
                                </label>

                                <label htmlFor="password2">Répétez le mot de passe :
                                    <div className="password-input">
                                        <input
                                            id="password2"
                                            name="password2"
                                            ref={passwordRef2}
                                            type={visible2 ? "text" : "password"}
                                            placeholder="Ex: motdepasse"
                                            className=""
                                            style={{ borderColor: passwordsMatch ? "#efeef4" : "red"}}
                                            onChange={() => {
                                                const p1 = passwordRef1.current?.value || "";
                                                const p2 = passwordRef2.current?.value || "";
                                                setPasswordsMatch(p1 === p2);
                                            }}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setVisible2(!visible2)}
                                            className="overlay-button"
                                            aria-label="Afficher ou masquer le contenu"
                                        >
                                            {visible2 ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                    </div>
                                </label>

                                {!passwordsMatch  && (
                                    <label className="error_login_message" htmlFor="errorpassword">Les mots de passe ne correspondent pas</label>
                                )}
                                {serverError != null && (
                                    <label className="error_login_message" htmlFor="api-datas">Échec de l'authentification</label>
                                )}


                            </div>

                            <button onClick={createAccount}>Créer le compte</button>
                        </div>
                    </div>
                </DivSelectionWithEnter>
            </div>

        </>
    );
};

export default CreateAccountPage;
/*
{passwordRef1.current?.value || '' != passwordRef2.current?.value || '' ? (
  <></>
) : (
    <>
    </>
)}
*/
