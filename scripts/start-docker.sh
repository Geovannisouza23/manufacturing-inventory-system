#!/bin/bash

echo "🐳 Construindo e iniciando containers Docker..."
echo "⏳ Isso pode levar alguns minutos na primeira execução..."
echo ""

# Ir para o diretório do projeto
cd /root/workspace/fullstack.test

# Executar docker-compose em background  
docker-compose up --build -d > /tmp/docker-build-full.log 2>&1 &
BUILD_PID=$!

# Aguardar com feedback
echo "📦 Download e construção das imagens em andamento..."
CONTADOR=0
while kill -0 $BUILD_PID 2>/dev/null; do
    CONTADOR=$((CONTADOR + 1))
    echo -ne "\r⏱️  Aguardando... ${CONTADOR}s"
    sleep 1
    
    # Timeout após 10 minutos
    if [ $CONTADOR -ge 600 ]; then
        echo -e "\n⚠️  Timeout! Verifique os logs em /tmp/docker-build-full.log"
        exit 1
    fi
done

echo -e "\n"
wait $BUILD_PID
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ Build concluído com sucesso!"
    echo ""
    
    # Aguardar containers ficarem prontos
    echo "🔄 Aguardando containers iniciarem..."
    sleep 10
    
    # Verificar status
    echo ""
    echo "📊 Status dos Containers:"
    docker-compose ps
    
    echo ""
    echo "🌐 URLs Disponíveis:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:8080"
    echo "   Swagger UI: http://localhost:8080/q/swagger-ui"
    echo "   PostgreSQL: localhost:5433"
    
    echo ""
    echo "📝 Comandos úteis:"
    echo "   Ver logs: docker-compose logs -f"
    echo "   Parar: docker-compose down"
    echo "   Reconstruir: docker-compose up --build"
else
    echo "❌ Erro no build. Ver logs em /tmp/docker-build-full.log"
    tail -50 /tmp/docker-build-full.log
    exit 1
fi
