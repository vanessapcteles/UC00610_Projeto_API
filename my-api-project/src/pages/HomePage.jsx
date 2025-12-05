import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container py-5">
            {/* Hero Section */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold mb-3">
                    🎌 Bem-vindo ao Anime Explorer
                </h1>
                <p className="lead text-muted">
                    Explore o fascinante mundo dos animes com dados em tempo real
                </p>
            </div>

            {/* Descrição do Projeto */}
            <div className="row mb-5">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="h4 mb-3">📖 Sobre o Projeto</h2>
                            <p className="mb-3">
                                Este website foi desenvolvido como parte do projeto da <strong>UC 00610 - Criar e integrar bases de dados noSQL nas apps</strong>.
                                O objetivo é demonstrar a integração de uma aplicação React com uma API pública, permitindo a visualização e exploração de dados de animes.
                            </p>
                            <p className="mb-0">
                                Utilizei as tecnologias modernas como o <strong>React</strong>, <strong>Vite</strong>, <strong>Bootstrap</strong> e <strong>React Router</strong> para criar uma experiência de utilizador fluida e responsiva.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sobre a API */}
            <div className="row mb-5">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow-sm border-primary">
                        <div className="card-body p-4">
                            <h2 className="h4 mb-3">🔌 Sobre a Jikan API</h2>
                            <p className="mb-3">
                                A <strong>Jikan API</strong> é uma API REST não oficial do <strong>MyAnimeList</strong>,
                                uma das maiores bases de dados de anime e manga do mundo.
                            </p>
                            <ul className="mb-3">
                                <li>✅ <strong>Gratuita e Open Source</strong></li>
                                <li>✅ <strong>Sem necessidade de autenticação</strong></li>
                                <li>✅ <strong>Dados atualizados em tempo real</strong></li>
                                <li>✅ <strong>Informações detalhadas sobre animes, mangas, personagens e mais</strong></li>
                            </ul>
                            <p className="mb-0">
                                <a
                                    href="https://docs.api.jikan.moe/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none"
                                >
                                    📚 Consultar documentação oficial →
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
                <h3 className="h5 mb-3">Pronto para começar?</h3>
                <Link to="/top-animes" className="btn btn-primary btn-lg">
                    🚀 Ver Top Animes
                </Link>
            </div>

            {/* Funcionalidades */}
            <div className="row mt-5">
                <div className="col-lg-10 mx-auto">
                    <h3 className="h5 text-center mb-4">✨ Funcionalidades</h3>
                    <div className="row g-3">
                        <div className="col-sm-6 col-md-4">
                            <div className="card h-100 text-center border-0 bg-body-secondary">
                                <div className="card-body">
                                    <div className="fs-1 mb-2">📋</div>
                                    <h4 className="h6">Listagem</h4>
                                    <p className="small text-body-secondary mb-0">
                                        Veja os animes mais populares do momento
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="card h-100 text-center border-0 bg-body-secondary">
                                <div className="card-body">
                                    <div className="fs-1 mb-2">🔍</div>
                                    <h4 className="h6">Detalhes</h4>
                                    <p className="small text-body-secondary mb-0">
                                        Explore informações detalhadas de cada anime
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div className="card h-100 text-center border-0 bg-body-secondary">
                                <div className="card-body">
                                    <div className="fs-1 mb-2">📊</div>
                                    <h4 className="h6">Dados em Tempo Real</h4>
                                    <p className="small text-body-secondary mb-0">
                                        Informações atualizadas diretamente da API
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
