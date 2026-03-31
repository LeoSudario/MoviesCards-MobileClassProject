# 🎬 App de Filmes (React Native)

Aplicativo mobile de filmes desenvolvido em **React Native**, com autenticação de usuários, busca de filmes via **TMDB API** e persistência local com **AsyncStorage**.

---

Alunos: Daniel Olimpio, Leonardo Sudario

## 📱 Funcionalidades

- Cadastro de usuário
- Login e logout
- Lista de filmes separada por usuário
- Busca de filmes por nome
- Adição de filmes populares automaticamente
- Exclusão de filmes da lista
- Tela de detalhes com informações completas do filme
- Interface com tema escuro (preto/vermelho)

---

## 🧠 Como o app funciona

1. O usuário se cadastra e os dados são salvos localmente.
2. No login, o app valida e-mail e senha.
3. O usuário autenticado é salvo em `loggedUser`.
4. A lista de filmes é armazenada por usuário em uma chave única:
   - `movies_email@usuario.com`
5. Na tela principal (`Main`), o usuário:
   - busca filme pelo nome, ou
   - adiciona filmes populares clicando no botão `+`.
6. Na tela de detalhes (`Details`), o app mostra:
   - título,
   - sinopse,
   - status,
   - nota,
   - votos,
   - lançamento,
   - duração,
   - gêneros e idioma.
7. No logout, o app remove `loggedUser` e retorna para o login.

---

## 🛠 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage)
- [Styled Components](https://styled-components.com/)
- [TMDB API](https://www.themoviedb.org/documentation/api)

---

## 📂 Estrutura principal

```bash
src/
  pages/
    cadastro.js     # Tela de cadastro
    login.js        # Tela de login
    main.js         # Tela principal (lista de filmes)
    user.js         # Tela de detalhes do filme
  services/
    api.js          # Configuração do axios para TMDB
  styles.js         # Estilos globais com styled-components
  routes.js         # Navegação entre telas
  config.js         # Chave da API TMDB
```

---

## ⚙️ Pré-requisitos

- Node.js instalado
- npm ou yarn
- Expo CLI (se estiver usando Expo)
- Chave da API do TMDB

---

## 🚀 Instalação e execução

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
```

2. Instale as dependências:
```bash
npm install
# ou
yarn
```

3. Configure a chave da API em `src/config.js`:
```javascript
export const TMDB_API_KEY = "SUA_CHAVE_AQUI";
```

4. Inicie o projeto:
```bash
npm start
# ou
yarn start
```

---

## 🔐 Persistência de dados (AsyncStorage)

O app utiliza as seguintes chaves:

- `users` → lista de usuários cadastrados
- `loggedUser` → usuário atualmente logado
- `movies_<email>` → lista de filmes de cada usuário

Exemplo:
- `movies_leo@email.com`
- `movies_maria@email.com`

---

## ✅ Regras implementadas

- Não permite login sem cadastro
- Não permite cadastrar e-mail duplicado
- Não permite adicionar filme repetido
- Cada usuário possui lista própria
- Logout limpa sessão atual

---

## 💡 Melhorias futuras

- Integração com backend real (JWT)
- Recuperação de senha
- Favoritos e avaliações
- Filtro por gênero
- Paginação/infinite scroll
- Testes automatizados

---

## 👨‍💻 Autor

Projeto desenvolvido para fins acadêmicos (faculdade).  
Se quiser, posso adaptar este README para o formato exigido pelo seu professor.