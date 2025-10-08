
import { Link } from "react-router-dom";
import UserDropdown from "./UserDropdown.js";
interface Props {
    username:string
    picture:string
    isConnected:boolean
}

function Header(props: Props) {
    // Fonction pour basculer le menu


    return (
        <header className="header">
            <Link to="/home">
            <img className="icon icon_redirect" src="raw.png" alt="Icon Jeux"/>
            </Link>
            <h1>Escape Game EPSI</h1>

            <UserDropdown isConnected={props.isConnected} username={props.username} picture={props.picture}/>
        </header>
    );
}

/*
<div className="user-area">
                    <div className="user-clickable">
                        {props.username && props.picture ? (
                            <>
                                <img className="imguser" src={props.picture} alt="Image utilisateur"/>
                                <span>
                                <p>{props.username}</p>
                                <p className="status-connection">Connecté</p>
                            </span>
                            </>
                        ) : (
                            <>
                                <img className="imguser" src="icone-profil-avatar-vide.avif" alt="Image utilisateur"/>
                                <span>
                                <p>Utilisateur</p>
                                    {Cookies.get('token') ?(
                                        <p className="status-connection">Connecté</p>
                                    ) : (
                                        <p className="status-connection">Non Connecté</p>
                                    )}

                            </span>
                            </>
                        )}

                    </div>
                </div>
 */
export default Header;
