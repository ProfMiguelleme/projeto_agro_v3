
Este guia foi feito para quem acabou de baixar o projeto `projeto_agro_v4` do GitHub e precisa subir tudo: Docker, banco PostgreSQL, migration, seed e aplicacao.

## 1. Entrar na pasta do projeto

```powershell
cd c:\Projeto_Reges\projeto_agro_v4
```

## 2. Subir o PostgreSQL no Docker

```powershell
docker compose up -d
docker ps
```

Verifique se o container `agro_postgres` esta rodando.

## 3. Instalar dependencias do backend

```powershell
npm install
```

## 4. Instalar dependencias do frontend

```powershell
cd frontend
npm install
cd ..
```

## 5. Rodar migration (criacao das tabelas)

```powershell
npx knex migrate:latest
```

Esse comando cria as tabelas no banco PostgreSQL (neste projeto, a tabela principal e `startups`).

## 6. Rodar seed (dados iniciais)

```powershell
npx knex seed:run
```

## 7. Iniciar backend + frontend juntos

```powershell
npm run dev-all
```

dor

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- API de startups: `http://localhost:3000/startups`

---

## Configuracao de banco deste projeto

Os dados ja estao configurados no projeto:

- Host: `localhost`
- Porta: `5432`
- Database: `agro_dev`
- User: `agro_user`
- Password: `agro_pass`
- Container Docker: `agro_postgres`

---

## Validacao (opcional)

### Ver tabelas criadas

```powershell
docker exec -it agro_postgres psql -U agro_user -d agro_dev -c "\dt"
```

### Ver dados inseridos pela seed

```powershell
docker exec -it agro_postgres psql -U agro_user -d agro_dev -c "SELECT * FROM startups;"
```

---

## Se der erro (reset rapido do banco)

Use este bloco para apagar o volume do banco e recriar tudo do zero:

```powershell
docker compose down -v
docker compose up -d
npx knex migrate:latest
npx knex seed:run
```

