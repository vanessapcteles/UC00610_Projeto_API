# 🎌 Anime Explorer - Projeto UC 00610

Aplicação React para explorar animes usando a Jikan API (MyAnimeList).

## 📋 Sobre o Projeto

Este projeto foi desenvolvido para a **UC 00610 - Criar e integrar bases de dados no SQL nas apps**, demonstrando a integração de uma aplicação React com uma API pública REST.

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **Bootstrap 5** - Framework CSS
- **React Router 6** - Navegação SPA
- **Jikan API v4** - API REST do MyAnimeList

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── AnimeCard.jsx      # Componente de cartão de anime
│   ├── navbar.jsx         # Barra de navegação
│   └── footer.jsx         # Rodapé
└── pages/
    ├── HomePage.jsx       # Página inicial
    ├── TopAnimePage.jsx   # Listagem de top animes
    └── AnimeDetailsPage.jsx # Detalhes do anime
```

## ✨ Funcionalidades Implementadas

### ✅ Critérios Obrigatórios
1. ✅ **API Pública** - Jikan API (MyAnimeList)
2. ✅ **Projeto Vite** - Configurado com React
3. ✅ **Estrutura de Pastas** - components/, pages/
4. ✅ **Navbar e Footer** - Responsivos com Bootstrap
5. ✅ **Página Inicial** - Apresentação do projeto e da API
6. ✅ **Fetch de Dados** - useEffect + useState com tratamento de estados
7. ✅ **Listagem** - Componentes AnimeCard renderizados dinamicamente
8. ✅ **Página de Detalhes** - Informações completas do anime

### 🎁 Funcionalidades Extra
- ✅ **Pesquisa em Tempo Real** - Filtro por título (inglês e japonês)
- ✅ **Navegação SPA** - React Router sem recarregamento
- ✅ **Tratamento de Erros** - Loading, erro e sem dados
- ✅ **Design Responsivo** - Mobile-first com Bootstrap

## 🔧 Como Executar

### Opção 1: Script PowerShell (Recomendado)
```powershell
.\start-dev.ps1
```

### Opção 2: Comando Manual (Bash)
```bash
npm run dev
```

O servidor será iniciado em `http://localhost:5173`

## 📚 Documentação da API

**Jikan API v4** - https://docs.api.jikan.moe/

### Endpoints Utilizados

- **Top Animes**: `GET https://api.jikan.moe/v4/top/anime`
- **Detalhes do Anime**: `GET https://api.jikan.moe/v4/anime/{id}`

### Estrutura de Dados

```javascript
{
  mal_id: number,           // ID único
  title: string,            // Título em inglês
  title_japanese: string,   // Título em japonês
  images: {
    jpg: {
      image_url: string,
      large_image_url: string
    }
  },
  score: number,            // Pontuação (0-10)
  type: string,             // TV, Movie, OVA, etc.
  episodes: number,
  synopsis: string,
  genres: Array,
  studios: Array,
  trailer: {
    youtube_id: string
  }
}
```

## 🎨 Componentes Principais

### AnimeCard
Cartão individual de anime com:
- Imagem
- Título
- Score e tipo
- Sinopse (truncada)
- Link para detalhes

### TopAnimePage
Listagem com:
- Fetch da API
- Barra de pesquisa
- Grid responsivo de cartões
- Estados de loading/erro

### AnimeDetailsPage
Página de detalhes com:
- Informações completas
- Trailer do YouTube
- Géneros e estúdios
- Link para MyAnimeList

## 📝 Notas de Desenvolvimento

- **PropTypes**: Validação de props no AnimeCard
- **Error Handling**: Try-catch em todas as chamadas à API
- **Loading States**: Spinners do Bootstrap
- **Responsive Design**: Grid system do Bootstrap (col-md-6, col-lg-4, col-xl-3)
- **SEO**: Meta tags e estrutura semântica HTML5

## 👩‍💻 Desenvolvido por

Vanessa Teles - UC 00610 - ATEC

## 📄 Licença

Projeto académico - UC 00610
