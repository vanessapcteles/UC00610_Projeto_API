import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const AnimeDetailsPage = () => {
    const { id } = useParams(); // Obtém o ID do anime da URL
    const navigate = useNavigate();

    // Estados
    const [anime, setAnime] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch dos detalhes do anime
    useEffect(() => {
        const fetchAnimeDetails = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const url = `https://api.jikan.moe/v4/anime/${id}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Erro HTTP: status ${response.status}`);
                }

                const data = await response.json();
                setAnime(data.data);
            } catch (e) {
                console.error("Falha ao buscar detalhes:", e);
                setError("Não foi possível carregar os detalhes deste anime.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnimeDetails();
    }, [id]);

    // Renderização condicional - Carregamento
    if (isLoading) {
        return (
            <div className="container text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">A carregar...</span>
                </div>
                <p className="mt-2">A carregar detalhes do anime...</p>
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
                    <Link to="/top-animes" className="btn btn-primary">
                        Voltar à Lista
                    </Link>
                </div>
            </div>
        );
    }

    // Renderização condicional - Sem dados
    if (!anime) {
        return (
            <div className="container text-center py-5">
                <div className="alert alert-warning" role="alert">
                    Anime não encontrado.
                </div>
                <Link to="/top-animes" className="btn btn-primary">
                    Voltar à Lista
                </Link>
            </div>
        );
    }

    // Renderização principal
    return (
        <div className="container py-5">
            {/* Botão Voltar */}
            <button
                onClick={() => navigate(-1)}
                className="btn btn-outline-secondary mb-4"
            >
                ← Voltar
            </button>

            <div className="row">
                {/* Coluna da Imagem */}
                <div className="col-md-4 col-lg-3 mb-4">
                    <img
                        src={anime.images.jpg.large_image_url}
                        alt={anime.title}
                        className="img-fluid rounded shadow"
                    />

                    {/* Informações Rápidas */}
                    <div className="card mt-3">
                        <div className="card-body">
                            <h5 className="card-title">Informações</h5>
                            <ul className="list-unstyled mb-0">
                                <li><strong>Tipo:</strong> {anime.type || 'N/A'}</li>
                                <li><strong>Episódios:</strong> {anime.episodes || 'N/A'}</li>
                                <li><strong>Status:</strong> {anime.status || 'N/A'}</li>
                                <li><strong>Estreia:</strong> {anime.aired?.from ? new Date(anime.aired.from).getFullYear() : 'N/A'}</li>
                                <li><strong>Duração:</strong> {anime.duration || 'N/A'}</li>
                                <li><strong>Rating:</strong> {anime.rating || 'N/A'}</li>
                            </ul>
                        </div>
                    </div>

                    {/* Score */}
                    <div className="card mt-3 bg-primary text-white">
                        <div className="card-body text-center">
                            <h5 className="card-title mb-0">Score</h5>
                            <div className="display-4">⭐ {anime.score || 'N/A'}</div>
                            <small>{anime.scored_by ? `${anime.scored_by.toLocaleString()} votos` : ''}</small>
                        </div>
                    </div>
                </div>

                {/* Coluna de Detalhes */}
                <div className="col-md-8 col-lg-9">
                    {/* Título */}
                    <h1 className="mb-3">{anime.title}</h1>

                    {/* Título em Japonês */}
                    {anime.title_japanese && (
                        <h5 className="text-body-secondary mb-3">{anime.title_japanese}</h5>
                    )}

                    {/* Géneros */}
                    {anime.genres && anime.genres.length > 0 && (
                        <div className="mb-3">
                            {anime.genres.map((genre) => (
                                <span key={genre.mal_id} className="badge bg-secondary me-2">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Sinopse */}
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Sinopse</h5>
                            <p className="card-text">
                                {anime.synopsis || 'Sem sinopse disponível.'}
                            </p>
                        </div>
                    </div>

                    {/* Background */}
                    {anime.background && (
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Background</h5>
                                <p className="card-text">{anime.background}</p>
                            </div>
                        </div>
                    )}

                    {/* Estúdios */}
                    {anime.studios && anime.studios.length > 0 && (
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Estúdios</h5>
                                <p className="mb-0">
                                    {anime.studios.map(studio => studio.name).join(', ')}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Trailer */}
                    {anime.trailer?.youtube_id && (
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">Trailer</h5>
                                <div className="ratio ratio-16x9">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                                        title="Trailer"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Links Externos */}
                    <div className="d-flex gap-2">
                        {anime.url && (
                            <a
                                href={anime.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary"
                            >
                                Ver no MyAnimeList
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeDetailsPage;
