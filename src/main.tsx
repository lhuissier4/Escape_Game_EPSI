import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// # Vérifie l'existence de l'élément root pour satisfaire TypeScript et éviter une erreur runtime
const rootElement = document.getElementById("root");
if (!rootElement) {
    // # Message d'erreur explicite si l'élément est introuvable
    throw new Error('Root element with id "root" not found');
}

ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
