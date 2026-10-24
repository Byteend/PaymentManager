# Payment Manager

## Deploy com Docker Compose

O backend e o frontend têm arquivos Compose independentes. Configure o banco
remoto no arquivo `backend/.env` e não compartilhe esse arquivo:

```powershell
cd backend
docker compose up --build -d
```

O backend fica disponível na porta 8080. Para publicar o frontend em outro
servidor, configure a URL pública da API em `frontend/.env`:

```powershell
cd ..\frontend
Copy-Item .env.example .env
```

Edite `VITE_API_URL` com a URL do backend e inicie o frontend:

```powershell
docker compose up --build -d
```

O frontend fica disponível na porta 3000. Como a URL da API é incorporada
durante o build do Vite, reconstrua a imagem após alterá-la.

## Desenvolvimento local

Inicie o backend com `backend\mvnw.cmd spring-boot:run` e, em outro terminal, inicie o frontend:

```powershell
cd frontend
npm install
npm run dev
```

O Vite encaminha as chamadas `/payments` para `http://localhost:8080`. Para
usar o Supabase localmente, configure as variáveis `SPRING_DATASOURCE_URL`,
`SPRING_DATASOURCE_USERNAME` e `SPRING_DATASOURCE_PASSWORD` no ambiente do
backend.
