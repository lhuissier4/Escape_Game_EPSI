import {type JSX} from "react";
import {useParams} from "react-router-dom";

const WaitingRoom = (): JSX.Element => {
    let { id } = useParams()
    let user1 = "bob2"
    let user2 = "dupuis3"
    return (
        <div className="defaultPage">
            <div className="sizedPage">
                <div className="title">
                    <h1>Salle d'attente</h1>
                    <h2>Vous avez le code {id}</h2>
                </div>
                <div className="txt-align-center txt-style">
                    <p>Utilisateur 1 : {user1}</p>
                    <p>Utilisateur 2 : {user2}</p>
                    <button className="button-style">Démarrer la partie</button>
                </div>



            </div>
        </div>
    )
}
export default WaitingRoom;