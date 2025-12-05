import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const AnimeCard = ({ anime }) => {
    return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
                {/* Imagem do Anime */}
                <img
                    src={anime.images.jpg.image_url}
                    className="card-img-top"
                    alt={anime.title}
                    style={{ height: '350px', objectFit: 'cover' }}
                />

                <div className="card-body d-flex flex-column">
                    {/* Título */}
                    <h5 className="card-title text-truncate" title={anime.title}>
                        {anime.title}
                    </h5>

                    {/* Informações */}
                    <div className="mb-2">
                        <span className="badge bg-primary me-2">
                            ⭐ {anime.score || 'N/A'}
                        </span>
                        <span className="badge bg-secondary">
                            {anime.type || 'N/A'}
                        </span>
                    </div>

                    {/* Sinopse (truncada) */}
                    <p className="card-text text-muted small flex-grow-1">
                        {anime.synopsis
                            ? anime.synopsis.substring(0, 100) + '...'
                            : 'Sem descrição disponível.'}
                    </p>

                    {/* Botão para ver detalhes */}
                    <Link
                        to={`/anime/${anime.mal_id}`}
                        className="btn btn-primary btn-sm mt-auto"
                    >
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Validação de props
AnimeCard.propTypes = {
    anime: PropTypes.shape({
        mal_id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        images: PropTypes.object.isRequired,
        score: PropTypes.number,
        type: PropTypes.string,
        synopsis: PropTypes.string
    }).isRequired
};

export default AnimeCard;
