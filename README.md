# Sistema Clube React

## Configuração da API

O frontend faz chamadas para rotas iniciadas com `/api`.

### Desenvolvimento com proxy do Vite

Por padrão, ao rodar o projeto em desenvolvimento, o Vite encaminha `/api` para:

`http://localhost:8080`

Se sua API estiver em outra porta ou host, crie um arquivo `.env` na pasta `sistemaClubeReact/` com:

```env
VITE_API_PROXY_TARGET=http://localhost:8080
```

Troque o valor para a URL real do seu backend.

### URL direta da API

Se preferir apontar o frontend diretamente para uma API externa, também pode definir:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Nesse caso, o `axios` usará essa base explicitamente.

## Executando o projeto

```powershell
npm install
npm run dev
```

Se aparecer erro de conexão, confirme que a API backend está rodando e que a porta configurada no `.env` está correta.
