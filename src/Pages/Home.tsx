import type {JSX} from "react";

const Home = (): JSX.Element => {
    return (
        <div className="login_container">
            <div className="" style={{textAlign: "center"}}>
                <h1>Page Home</h1>
                <p><a href="/create-code">Cliquez ici</a> pour allez generer un code de connexion à une partie</p>
            </div>

        </div>
    )
}
export default Home;