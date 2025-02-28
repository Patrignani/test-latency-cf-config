
# Script de Inicialização do MongoDB

Este script é utilizado para iniciar um container Docker com o MongoDB, aguardar a inicialização do banco e carregar dados iniciais usando o `mongo-init.js`.

## Pré-requisitos

Antes de usar este script, você precisa ter as seguintes ferramentas instaladas:

- **Docker** (e Docker Compose)
- **Docker Compose** (embutido no Docker para versões mais recentes)

## Passos para usar o script

### 1. Clone ou baixe os arquivos necessários

- Baixe ou clone o repositório onde o arquivo `docker-compose.yml` e o script `mongo-init.js` estão localizados.
  
### 2. Preparação

Certifique-se de que o Docker e o Docker Compose estão instalados corretamente no seu sistema.

### 3. Executando o script

#### Para Windows, macOS e Linux:

1. **Abra o terminal ou o prompt de comando** no seu sistema.

2. **Navegue até a pasta onde o script está localizado**. Por exemplo, no terminal:

   ```bash
   cd /caminho/para/o/diretorio/do/script
   ```

3. **Execute o script** usando o seguinte comando:

   Para Linux/macOS:

   ```bash
   ./load_data.sh
   ```

   Para Windows (usando Git Bash ou terminal compatível com bash):

   ```bash
   bash load_data.sh
   ```

   Ou, se você tiver permissões de execução:

   ```bash
   chmod +x load_data.sh
   ./load_data.sh
   ```

### 4. O que o script faz?

1. **Inicia o container do MongoDB** usando o `docker-compose up -d`.
2. **Aguarda 10 segundos** para garantir que o MongoDB esteja pronto para conexões.
3. **Carrega os dados iniciais** no MongoDB executando o script `mongo-init.js` dentro do container, utilizando o MongoDB Shell (`mongosh`).

### 5. Verificando se o MongoDB foi iniciado corretamente

Após a execução do script, o MongoDB deverá estar disponível. Você pode verificar se o MongoDB foi iniciado corretamente com o comando:

```bash
docker ps
```

Isso exibirá a lista de containers em execução. O container do MongoDB deverá estar na lista.

### 6. Como interromper o container

Para interromper o container do MongoDB, você pode usar o comando:

```bash
docker-compose down
```

Este comando irá parar e remover o container, mas manterá os dados persistentes no volume.

## Problemas Comuns

- **Erro de autenticação**: Certifique-se de que o MongoDB foi inicializado corretamente com o usuário e senha configurados no script.
- **Demora para iniciar**: O tempo de espera de 10 segundos pode ser ajustado dependendo da velocidade de inicialização do MongoDB em sua máquina.
