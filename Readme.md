# EPSI escape game - Frontend
Le Proxy de vite pour accéder à l'api sera `/api/`

apidatas, lors du login, doit retourner un `access_token`

Liste des endpoints
- POST /login  
Permet de se connecter à un compte existant
param : json {"username":"", "password":""}


- POST /create-account  
Permet de créer un compte
param : From()
```py
username: str = Form(...),
password: str = Form(...),
name: str = Form(...),
firstname: str = Form(...),
email: str = Form(...),
picture: Optional[UploadFile] = File(None),
```
- POST /join-game  
Permet de vérifier que le code entré correspond à une partie existante et renvoie un http:200
param: gamecode:str


- GET /generate-code  
Genère un nouveau code de jeux (pour une nouvelle partie)
return : {"gamecode":26579}


