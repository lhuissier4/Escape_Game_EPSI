# main.py
from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi import HTTPException
from fastapi import FastAPI, Form, File, UploadFile, HTTPException
from typing import Optional
from fastapi.responses import JSONResponse
import random

import uvicorn
app = FastAPI()

# # Modèle d'entrée : accepte "password" (anglais) et l'alias "motdepasse" (français)
class LoginRequest(BaseModel):
    username: str
    password: str

    class Config:
        # # Permet d'envoyer des champs avec alias sans forcer l'usage des noms Python
        populate_by_name = True

class ExistingGame(BaseModel):
    gamecode:str

# # Endpoint /login : renvoie des données fictives
@app.post("/login")
def login(payload: LoginRequest):
    # # Ici vous inséreriez votre logique d'authentification réelle
    # # Nous renvoyons des valeurs factices pour la démonstration
    if payload.username.strip() == "" or payload.password.strip() == "":
        raise HTTPException(status_code=400, detail="Champs username et password requis")

    return {
        "username": "jd23",
        "first_name": "John",                         # # Prénom fictif
        "last_name": "Doe",                           # # Nom fictif
        "email": "john.doe@example.com",              # # Email fictif
        "image_path": "/static/images/avatar.png",    # # Chemin fictif d'image
        "access_token": f"fake_jwt_token_for_{payload.username}"  # # Jeton d'accès factice
    }
@app.post("/create-account")
async def create_account(
    username: str = Form(...),
    password: str = Form(...),
    name: str = Form(...),
    firstname: str = Form(...),
    email: str = Form(...),
    picture: Optional[UploadFile] = File(None),  # # Fichier optionnel
):
    #print(username ,  password,  name,  firstname,  email )
    #print("picture =",picture)
    ## # Vérification des champs vides (hors "picture")
    if username == "" or password == "" or name == "" or firstname == "" or email == "" :
        raise HTTPException(
            status_code=400,
            detail=f"Touts les champs doivent être completés."
        )

    # # Si tout est correct, on ne fait rien
    return {"status": "ok"}

@app.post("/join-game")
def join_game(payload:ExistingGame):
    if payload.gamecode == "":
        raise HTTPException(
            status_code=400,
            detail=f"Veillez entrer un code valide"
        )
    return {"status": "ok"}

@app.get("/generate-code")
def generate_game():
    return JSONResponse({"gamecode": random.randint(100000, 999999)})

@app.get("/verify-validity-of-code")
def verify_code(gamecode:str ):
    if (gamecode != "" ):
        if (gamecode != "2"):
            return {"status": "ok"}
        raise HTTPException(
                status_code=400,
                detail=f"Ceci est le cas d'erreur de test'"
            )
    else:
        raise HTTPException(
            status_code=400,
            detail=f"Veillez entrer un code valide"
        )

if __name__ == "__main__":
    # # Remplacez "main:app" si votre module/app a un autre nom
    uvicorn.run(
        "apifictive:app",
        host="127.0.0.1",
        port=8000,
        reload=True,        # # À désactiver en production
        workers=1           # # Ajuster en production (ex. nombre de CPU)
    )