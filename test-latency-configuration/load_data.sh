#!/bin/bash

# Iniciar o container do MongoDB usando Docker Compose
docker-compose up -d

# Aguardar o MongoDB estar pronto para aceitar conexões
echo "Aguardando o MongoDB iniciar..."
sleep 10

# Executar o script de inicialização no container do MongoDB
echo "Carregando dados iniciais..."
docker exec -it mongodb-test mongosh -u test -p test --authenticationDatabase admin test-latency-configuration /docker-entrypoint-initdb.d/mongo-init.js

echo "Dados carregados com sucesso!"