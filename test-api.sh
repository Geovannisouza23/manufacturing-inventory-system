#!/bin/bash

echo "===== Testando API do Sistema de Estoque ====="
echo ""

echo "1. Listando produtos (deve retornar array vazio):"
curl -s http://localhost:8080/api/products
echo -e "\n"

echo "2. Criando um produto:"
PRODUCT=$(curl -s -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "code": "PROD001",
    "name": "Produto Teste",
    "price": 150.00
  }')
echo "$PRODUCT"
PRODUCT_ID=$(echo "$PRODUCT" | grep -o '"id":[0-9]*' | grep -o '[0-9]*')
echo -e "\nProduto criado com ID: $PRODUCT_ID\n"

echo "3. Listando produtos novamente:"
curl -s http://localhost:8080/api/products
echo -e "\n"

echo "4. Criando matéria-prima:"
MATERIAL=$(curl -s -X POST http://localhost:8080/api/raw-materials \
  -H "Content-Type: application/json" \
  -d '{
    "code": "MAT001",
    "name": "Matéria Prima 1",
    "stockQuantity": 100
  }')
echo "$MATERIAL"
echo -e "\n"

echo "5. Listando matérias-primas:"
curl -s http://localhost:8080/api/raw-materials
echo -e "\n"

echo "6. Testando health check:"
curl -s http://localhost:8080/q/health
echo -e "\n"

echo "===== Testes concluídos! ====="
