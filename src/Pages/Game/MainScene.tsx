import type { JSX } from "react";
import {useNavigate} from "react-router-dom";

function MainScene(): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="scene-container">
            {/* Image de fond plein écran */}
            <img
                src="/earth.jpg"
                alt="Earth background"
                className="background-image"
            />

            {/* Images cliquables */}
            <img
                src="/gaz.jpg"
                alt="Zone 1"
                className="clickable-image img1"
                onClick={() => navigate("/game/environment/:id/play/mystery/1")}
            />

            <img
                src="/pollution.jpg"
                alt="Zone 2"
                className="clickable-image img2"
                onClick={() => navigate("/game/environment/:id/play/mystery/2")}
            />

            <img
                src="/transports.jpg"
                alt="Zone 3"
                className="clickable-image img3"
                onClick={() => navigate("/game/environment/:id/play/mystery/3")}
            />

            <img
                src="/recyclages.png"
                alt="Zone 4"
                className="clickable-image img4"
                onClick={() => navigate("/game/environment/:id/play/mystery/4")}
            />

            {/* Texte superposé */}
            <div className="overlay-text">
                <h1>Escape game environnement</h1>
            </div>
        </div>
    );
}

export default MainScene;
