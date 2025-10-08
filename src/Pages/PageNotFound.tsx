import {useLocation} from "react-router-dom";
import {JSX} from "react";

interface Props {
    homepage:string;
}
function PageNotFound(props: Props): JSX.Element {
    const loc = useLocation();

    // Accès à l'URL actuelle (chemin + éventuelle query string)
    const currentPath = location.protocol + "//" + location.host + loc.pathname;
    return(
        <div className="PageNotFound">
            <h1>Error 404 - Page Not Found</h1>
            <p>L'url <a href={currentPath}>{currentPath}</a> est introuvable</p>
            <p><a href={props.homepage}>Cliquez ici</a> pour revenir à la page d'acceuil</p>
        </div>
    )
}
export default PageNotFound;