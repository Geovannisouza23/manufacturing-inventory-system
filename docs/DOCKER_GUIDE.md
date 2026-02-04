# 🐳 Sistema de Estoque - Docker Deployment

## ✅ Status Atual

- **PostgreSQL**: ✅ Rodando em Docker (porta 5433)
- **Backend**: ⚙️ Pronto para Docker ou execução local
- **Frontend**: ⚙️ Pronto para Docker ou execução local

---

## 🚀 Opção 1: Executar com Docker Compose (Completo)

### Pré-requisitos
- Docker e Docker Compose instalados
- Conexão de internet para download das imagens (~ 500MB na primeira vez)

### Comandos

```bash
cd /root/workspace/fullstack.test

# Iniciar todos os serviços
docker-compose up --build -d

# Acompanhar logs
docker-compose logs -f

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (limpar dados)
docker-compose down -v
```

### URLs após inicialização
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/q/swagger-ui
- **PostgreSQL**: localhost:5433

### Tempo estimado
- **Primeira execução**: 5-10 minutos (download de imagens)
- **Execuções seguintes**: 1-2 minutos (usa cache)

---

## 🏃 Opção 2: Executar Localmente (Rápido)

### PostgreSQL em Docker
```bash
docker run -d --name inventory-db \
  -e POSTGRES_DB=inventory_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5433:5432 \
  --restart unless-stopped \
  postgres:15-alpine
```

### Backend (Quarkus)
```bash
cd backend
mvn quarkus:dev -Dquarkus.http.host=0.0.0.0
```
Acesse: http://localhost:8080/q/swagger-ui

### Frontend (React)
```bash
cd frontend
npm install
npm start
```
Acesse: http://localhost:3000

---

## 📦 Estrutura dos Containers

### 🗄️ PostgreSQL (postgres:15-alpine)
- **Porta**: 5433:5432
- **Database**: inventory_db
- **User**: postgres
- **Password**: postgres
- **Volume**: inventory-postgres-data

### ⚙️ Backend (Quarkus 2.16 + Java 11)
- **Porta**: 8080
- **Build**: Multi-stage (Maven 3.6.3 + Eclipse Temurin 11)
- **Healthcheck**: `/q/health/ready`
- **Dependências**: Conecta automaticamente com postgres

### 🎨 Frontend (React 18 + Nginx)
- **Porta**: 3000:80  
- **Build**: Multi-stage (Node 18 + Nginx Alpine)
- **Proxy reverso**: Nginx roteia `/api` para backend

---

## 🔍 Monitoramento e Troubleshooting

### Ver containers rodando
```bash
docker-compose ps
```

### Ver logs de um serviço específico
```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Restart um serviço
```bash
docker-compose restart backend
```

### Conectar ao banco de dados
```bash
docker exec -it inventory-postgres psql -U postgres -d inventory_db
```

### Verificar saúde dos serviços
```bash
# Backend health
curl http://localhost:8080/q/health

# Frontend health
curl http://localhost:3000/health
```

---

## 🛠️ Arquivos Docker

### `backend/Dockerfile`
- Multi-stage build com Maven 3.6.3 e Java 11
- Gera uber-jar para simplificar deployment
- Imagem runtime: eclipse-temurin:11-jre-alpine (~150MB)

### `frontend/Dockerfile`
- Multi-stage build com Node 18
- Build otimizado do React
- Nginx para servir arquivos estáticos + proxy reverso
- Imagem runtime: nginx:alpine (~50MB)

### `docker-compose.yml`
- 3 serviços orquestrados
- Network compartilhada (`inventory-network`)
- Healthchecks configurados
- Restart policies
- Dependências entre serviços

---

## 🎯 Testando a Aplicação

### 1. Criar um Produto
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROD001",
    "name": "Produto Teste",
    "price": 150.00
  }'
```

### 2. Listar Produtos
```bash
curl http://localhost:8080/api/products
```

### 3. Criar Matéria-Prima
```bash
curl -X POST http://localhost:8080/api/raw-materials \
  -H "Content-Type: application/json" \
  -d '{
    "code": "MAT001",
    "name": "Matéria Prima 1",
    "stockQuantity": 100
  }'
```

### 4. Análise de Produção
```bash
curl http://localhost:8080/api/production/producible
```

### Ou use o Swagger UI interativo:
http://localhost:8080/q/swagger-ui

---

## 📊 Volumes e Persistência

Os dados do PostgreSQL são persistidos em um volume Docker:
```bash
# Ver volumes
docker volume ls | grep inventory

# Backup do banco
docker exec inventory-postgres pg_dump -U postgres inventory_db > backup.sql

# Restore do banco
docker exec -i inventory-postgres psql -U postgres inventory_db < backup.sql
```

---

## 🧹 Limpeza

### Remover apenas containers
```bash
docker-compose down
```

### Remover containers + volumes (APAGA DADOS!)
```bash
docker-compose down -v
```

### Limpeza completa (imagens também)
```bash
docker-compose down -v --rmi all
```

---

## 🔐 Segurança

⚠️ **IMPORTANTE**: Esta configuração é para desenvolvimento!

Para produção, altere:
- Senha do PostgreSQL (usar secrets/environment)
- Adicionar HTTPS/TLS
- Configurar CORS adequadamente
- Usar autenticação/autorização
- Configurar rate limiting
- Habilitar logs estruturados
- Usar registry privado para images

---

## 📈 Performance

### Otimizações aplicadas:
- ✅ Multi-stage builds (imagens menores)
- ✅ Layer caching (builds mais rápidos)
- ✅ Uber-jar no backend (startup rápido)
- ✅ Nginx com gzip e cache
- ✅ Healthchecks para orchestração

### Melhorias futuras:
- Redis para caching
- Connection pooling otimizado
- CDN para assets estáticos
- Load balancer (múltiplas instâncias)

---

## 📝 Notas

- O backend demora ~30-60s para iniciar na primeira vez
- Dependências Maven são cacheadas após primeiro build
- Frontend build gera ~2MB de assets otimizados
- PostgreSQL inicia em ~5s

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs: `docker-compose logs`
2. Verifique conectividade: `docker network inspect inventory-network`
3. Verifique recursos: `docker stats`
4. Reconstrua: `docker-compose up --build --force-recreate`
