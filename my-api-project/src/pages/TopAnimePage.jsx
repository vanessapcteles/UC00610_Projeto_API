import React, { useState, useEffect } from 'react';
import AnimeCard from '../components/AnimeCard';

const TopAnimePage = () => {
    // Estados para gerir os dados e o processo de fetch
    const [animes, setAnimes] = useState([]);
    const [filteredAnimes, setFilteredAnimes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para pesquisa e filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedLetter, setSelectedLetter] = useState('');
    const [availableGenres, setAvailableGenres] = useState([]);

    // Alfabeto para filtro
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // useEffect para executar o fetch quando o componente monta
    useEffect(() => {
        const fetchAllAnimes = async () => {
            setIsLoading(true);
            setError(null);

            try {
                // Buscar Top Animes
                const topResponse = await fetch('https://api.jikan.moe/v4/top/anime?limit=25');
                if (!topResponse.ok) {
                    throw new Error(`Erro HTTP: status ${topResponse.ok}`);
                }
                const topData = await topResponse.json();
                let allAnimes = [...topData.data];

                // Aguardar um pouco para não sobrecarregar a API
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Buscar animes populares adicionais
                const popularResponse = await fetch('https://api.jikan.moe/v4/anime?order_by=popularity&limit=25');
                if (popularResponse.ok) {
                    const popularData = await popularResponse.json();
                    // Adicionar apenas animes que ainda não existem
                    popularData.data.forEach(anime => {
                        if (!allAnimes.find(a => a.mal_id === anime.mal_id)) {
                            allAnimes.push(anime);
                        }
                    });
                }

                // Verificar letras que ainda estão vazias e buscar animes específicos
                const missingLetters = alphabet.filter(letter =>
                    !allAnimes.some(anime => anime.title.toUpperCase().startsWith(letter))
                );

                // Buscar animes para letras específicas que faltam
                const letterSearches = {
                    'N': 'Naruto',
                    'Q': 'Quintessential',
                    'U': 'Uzumaki',
                    'V': 'Vinland',
                    'W': 'Weathering',
                    'X': 'xxxHolic',
                    'Y': 'Your Name',
                    'Z': 'Zankyou'
                };

                for (const letter of missingLetters) {
                    if (letterSearches[letter]) {
                        await new Promise(resolve => setTimeout(resolve, 500));
                        try {
                            const searchResponse = await fetch(
                                `https://api.jikan.moe/v4/anime?q=${letterSearches[letter]}&limit=5`
                            );
                            if (searchResponse.ok) {
                                const searchData = await searchResponse.json();
                                searchData.data.forEach(anime => {
                                    if (!allAnimes.find(a => a.mal_id === anime.mal_id)) {
                                        allAnimes.push(anime);
                                    }
                                });
                            }
                        } catch (e) {
                            console.log(`Não foi possível buscar animes para letra ${letter}`);
                        }
                    }
                }

                setAnimes(allAnimes);
                setFilteredAnimes(allAnimes);

                // Extrair géneros únicos
                const genresSet = new Set();
                allAnimes.forEach(anime => {
                    if (anime.genres) {
                        anime.genres.forEach(genre => {
                            genresSet.add(genre.name);
                        });
                    }
                });
                setAvailableGenres(Array.from(genresSet).sort());

            } catch (e) {
                console.error("Falha ao buscar dados:", e);
                setError("Ocorreu um erro ao carregar os animes. Por favor, tente novamente.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllAnimes();
    }, []);

    // useEffect para filtrar animes quando qualquer filtro muda
    useEffect(() => {
        let filtered = animes;

        // Filtro por texto
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(anime =>
                anime.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (anime.title_japanese && anime.title_japanese.includes(searchTerm))
            );
        }

        // Filtro por género
        if (selectedGenre !== '') {
            filtered = filtered.filter(anime =>
                anime.genres && anime.genres.some(genre => genre.name === selectedGenre)
            );
        }

        // Filtro por letra
        if (selectedLetter !== '') {
            filtered = filtered.filter(anime =>
                anime.title.toUpperCase().startsWith(selectedLetter)
            );
        }

        setFilteredAnimes(filtered);
    }, [searchTerm, selectedGenre, selectedLetter, animes]);

    // Função para limpar todos os filtros
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedGenre('');
        setSelectedLetter('');
    };

    // Renderização condicional - Carregamento
    if (isLoading) {
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">A carregar...</span>
                </div>
                <p className="mt-2">A carregar os dados dos animes mais populares...</p>
                <small className="text-body-secondary">Isto pode demorar alguns segundos...</small>
            </div>
        );
    }

    // Renderização condicional - Erro
    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Erro!</h4>
                    <p>{error}</p>
                    <hr />
                    <p className="mb-0">Verifique a sua ligação ou a disponibilidade da API.</p>
                </div>
            </div>
        );
    }

    // Renderização condicional - Sem dados
    if (animes.length === 0) {
        return (
            <div className="container text-center py-5">
                <div className="alert alert-warning" role="alert">
                    Nenhum anime encontrado.
                </div>
            </div>
        );
    }

    // Renderização principal
    return (
        <div className="container py-5">
            <h2 className="mb-4">Top Animes do Momento</h2>
            <p className="text-body-secondary mb-4">Esta lista é obtida em tempo real da Jikan API.</p>

            {/* Barra de Pesquisa e Filtros */}
            <div className="row mb-4">
                <div className="col-lg-10 mx-auto">
                    <div className="row g-3">
                        {/* Campo de Pesquisa */}
                        <div className="col-md-5">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Pesquisar Anime..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Filtro por Género */}
                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                            >
                                <option value="">Todos os géneros</option>
                                {availableGenres.map(genre => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Botão Limpar Filtros */}
                        <div className="col-md-3">
                            <button
                                className="btn btn-outline-secondary w-100"
                                type="button"
                                onClick={clearFilters}
                                disabled={searchTerm === '' && selectedGenre === '' && selectedLetter === ''}
                            >
                                Limpar Filtros
                            </button>
                        </div>
                    </div>

                    {/* Filtro Alfabético A-Z */}
                    <div className="mt-3">
                        <div className="d-flex align-items-center mb-2">
                            <small className="text-body-secondary me-2">Pesquisa por letra:</small>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                            {alphabet.map(letter => {
                                const count = animes.filter(anime =>
                                    anime.title.toUpperCase().startsWith(letter)
                                ).length;

                                return (
                                    <button
                                        key={letter}
                                        className={`btn btn-sm ${selectedLetter === letter ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
                                        disabled={count === 0}
                                        title={`${count} anime(s)`}
                                        style={{ minWidth: '40px' }}
                                    >
                                        {letter}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Contador de Resultados */}
                    {(searchTerm !== '' || selectedGenre !== '' || selectedLetter !== '') && (
                        <div className="mt-3">
                            <small className="text-body-secondary">
                                {filteredAnimes.length} resultado(s) encontrado(s)
                                {selectedLetter && ` começando com "${selectedLetter}"`}
                                {selectedGenre && ` em "${selectedGenre}"`}
                            </small>
                        </div>
                    )}
                </div>
            </div>

            {/* Listagem de Animes */}
            {filteredAnimes.length > 0 ? (
                <div className="row justify-content-center g-4">
                    {filteredAnimes.map((anime) => (
                        <AnimeCard key={anime.mal_id} anime={anime} />
                    ))}
                </div>
            ) : (
                <div className="alert alert-info text-center" role="alert">
                    Nenhum anime encontrado com os filtros aplicados.
                </div>
            )}
        </div>
    );
};

export default TopAnimePage;