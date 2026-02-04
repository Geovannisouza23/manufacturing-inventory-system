# GitHub Actions CI/CD Workflows

Este projeto utiliza GitHub Actions para automação de CI/CD. Abaixo está a descrição de cada workflow configurado.

---

## 📋 Workflows Disponíveis

### 1. **Backend CI** (`backend-ci.yml`)
Executa automaticamente quando há mudanças no backend.

**Triggers:**
- Push/PR nas branches `main` ou `develop`
- Mudanças em arquivos do diretório `backend/`

**Jobs:**
- ✅ **test**: Executa testes unitários com JUnit
- ✅ **build**: Compila o projeto com Maven
- 📊 Gera relatórios de testes
- 📦 Upload do artefato (JAR)

---

### 2. **Frontend CI** (`frontend-ci.yml`)
Executa automaticamente quando há mudanças no frontend.

**Triggers:**
- Push/PR nas branches `main` ou `develop`
- Mudanças em arquivos do diretório `frontend/`

**Jobs:**
- ✅ **test**: Executa testes unitários com Jest
- ✅ **build**: Build de produção do React
- 📊 Upload de cobertura de testes para Codecov
- 📦 Upload do artefato (build)

---

### 3. **E2E Tests** (`e2e-tests.yml`)
Executa testes end-to-end com Cypress.

**Triggers:**
- Push/PR nas branches `main` ou `develop`
- Manual (workflow_dispatch)

**Jobs:**
- 🗄️ Inicia PostgreSQL como service
- 🚀 Inicia backend (Quarkus)
- 🚀 Inicia frontend (React)
- 🧪 Executa testes Cypress
- 📸 Upload de screenshots (em caso de falha)
- 🎥 Upload de vídeos dos testes

---

### 4. **Docker Build & Push** (`docker-build.yml`)
Cria e publica imagens Docker no GitHub Container Registry.

**Triggers:**
- Push na branch `main`
- Tags com formato `v*` (exemplo: v1.0.0)
- Manual (workflow_dispatch)

**Jobs:**
- 🐳 Build e push da imagem backend
- 🐳 Build e push da imagem frontend
- 🔒 Scan de segurança com Trivy
- 📋 Upload de resultados para GitHub Security

**Imagens geradas:**
```
ghcr.io/<seu-usuario>/fullstack.test-backend:main
ghcr.io/<seu-usuario>/fullstack.test-frontend:main
```

---

### 5. **Full CI/CD Pipeline** (`full-ci-cd.yml`)
Pipeline completo de integração e deploy.

**Triggers:**
- Push/PR nas branches `main` ou `develop`
- Manual (workflow_dispatch)

**Jobs:**
1. **backend-test**: Testa backend
2. **frontend-test**: Testa frontend
3. **build**: Compila ambos os projetos
4. **deploy-staging**: Deploy automático em staging (branch `develop`)
5. **deploy-production**: Deploy automático em produção (branch `main`)
6. **notify**: Notificação de status

**Environments configurados:**
- `staging` → https://staging.inventory-management.com
- `production` → https://inventory-management.com

---

### 6. **Code Quality** (`code-quality.yml`)
Análise de qualidade de código.

**Triggers:**
- Push/PR nas branches `main` ou `develop`

**Jobs:**
- 📊 **SonarCloud**: Análise estática de código
- 🔍 **Dependency Review**: Revisa dependências em PRs
- 🔒 **CodeQL**: Análise de segurança (Java e JavaScript)

**Requisitos:**
- Token do SonarCloud: `SONAR_TOKEN` (secrets)

---

### 7. **Dependabot** (`dependabot.yml`)
Atualização automática de dependências.

**Configuração:**
- Maven (backend): Semanalmente às segundas
- npm (frontend): Semanalmente às segundas
- GitHub Actions: Semanalmente às segundas

**Funcionalidades:**
- Cria PRs automáticos para atualizar dependências
- Limita número de PRs abertos (5-10)
- Adiciona labels automaticamente
- Atribui revisores

---

## 🚀 Como Usar

### 1. Configurar Secrets
No GitHub, vá em **Settings → Secrets and variables → Actions** e adicione:

```bash
# Opcional - Para SonarCloud
SONAR_TOKEN=seu-token-do-sonarcloud

# Opcional - Para deploy
DEPLOY_SERVER=seu-servidor.com
DEPLOY_KEY=sua-chave-ssh
```

### 2. Habilitar GitHub Container Registry
1. Vá em **Settings → Packages**
2. Configure visibilidade das imagens (público/privado)

### 3. Criar Environments (Opcional)
Para deploy automático:
1. Vá em **Settings → Environments**
2. Crie ambientes: `staging` e `production`
3. Configure URLs e proteções (aprovações, branches protegidos)

---

## 📊 Status Badges

Adicione badges no README.md:

```markdown
![Backend CI](https://github.com/seu-usuario/fullstack.test/workflows/Backend%20CI/badge.svg)
![Frontend CI](https://github.com/seu-usuario/fullstack.test/workflows/Frontend%20CI/badge.svg)
![E2E Tests](https://github.com/seu-usuario/fullstack.test/workflows/E2E%20Tests/badge.svg)
![Docker Build](https://github.com/seu-usuario/fullstack.test/workflows/Docker%20Build%20%26%20Push/badge.svg)
```

---

## 🔧 Customização

### Modificar frequência de testes
Edite os triggers em cada workflow:

```yaml
on:
  push:
    branches: [ main, develop, feature/* ]
  schedule:
    - cron: '0 2 * * *'  # Executa diariamente às 2h
```

### Adicionar notificações
Adicione ao final de qualquer job:

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Deploy personalizado
Edite os jobs de deploy em `full-ci-cd.yml`:

```yaml
- name: Deploy to Server
  run: |
    ssh user@server 'cd /app && docker-compose pull && docker-compose up -d'
```

---

## 📈 Fluxo de Trabalho Recomendado

### Desenvolvimento (feature branches)
```bash
git checkout -b feature/nova-funcionalidade
# Desenvolve...
git push origin feature/nova-funcionalidade
# Cria Pull Request
```
→ Executa: Backend CI + Frontend CI

### Staging (develop)
```bash
git checkout develop
git merge feature/nova-funcionalidade
git push origin develop
```
→ Executa: Full CI/CD → Deploy para Staging

### Produção (main)
```bash
git checkout main
git merge develop
git tag v1.0.0
git push origin main --tags
```
→ Executa: Full CI/CD → Deploy para Produção + Docker Build

---

## 🐛 Troubleshooting

### Testes E2E falhando
- Verifique timeouts (pode precisar aumentar)
- PostgreSQL service pode demorar a iniciar
- Certifique-se que portas 3000 e 8080 estão livres

### Build Docker falhando
- Verifique se Dockerfile está correto
- Certifique-se que GITHUB_TOKEN tem permissão de escrita em packages

### SonarCloud não funciona
- Adicione o token nos secrets
- Configure projeto no SonarCloud primeiro
- Atualize `organization` e `projectKey` no workflow

---

## 📚 Recursos

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Cypress GitHub Action](https://github.com/cypress-io/github-action)
- [SonarCloud GitHub Action](https://github.com/SonarSource/sonarcloud-github-action)

---

**Autor**: Sistema de Gerenciamento de Estoque  
**Última atualização**: Fevereiro 2026
