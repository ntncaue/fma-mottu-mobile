# Sistema de Localização de Motos - Mottu

## Integrantes
- Antonio Caue - RM: 558891
- Marcelo Bonfim - RM: 558254
- Felipe Gomes - RM: 557435

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Rode o projeto:
   ```bash
   npx expo start
   ```
3. Use o app no emulador Android/iOS ou no seu celular com o aplicativo Expo Go (escaneando o QR Code).

## Descrição da Solução

Este projeto é um sistema para localização de motos no pátio da Mottu, utilizando identificadores ESP32. O app permite:

- Cadastrar motos com nome (opcional), placa e identificador ESP32.
- Visualizar a lista de motos cadastradas.
- Buscar motos por placa ou identificador. (Em breve)
- Visualizar detalhes e localização de cada moto no pátio.
- Persistência dos dados localmente usando AsyncStorage.

O objetivo é facilitar a identificação e localização rápida das motos no pátio da empresa, tornando o processo mais eficiente para os colaboradores.

