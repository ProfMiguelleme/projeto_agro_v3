# Como criar a imagem do PostgreSQL no Docker (este projeto)

## 1. Entrar na pasta do projeto

```powershell
cd c:\Projeto_Reges\projeto_agro_v4
```

## 2. Conferir a imagem no `docker-compose.yml`

Neste projeto, a imagem configurada e:

```yaml
image: postgres:15
```

## 3. Baixar somente a imagem (opcional)

```powershell
docker pull postgres:15
```

## 4. Criar e subir o container com Docker Compose

```powershell
docker compose up -d
```

Esse comando:
- baixa a imagem `postgres:15` (se ainda nao existir localmente)
- cria o container `agro_postgres`
- inicia o banco de dados

## 5. Validar se subiu

```powershell
docker ps
```

Verifique se aparece o container `agro_postgres`.

## 6. (Opcional) Criar tabelas e dados iniciais

```powershell
npx knex migrate:latest
npx knex seed:run
```

