// src/paginas/home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import nasaLogo from '../imagens/NASA_logo.svg.png'
import asteroidImage from '../imagens/cometa.png'

const Home = () => {
    const [objects, setObjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchNEOData = async () => {
            try {
                const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=LOjxIiZiqTEk7eSgUQfKf0VCDyctNdsJ4ncV6BMq`);
                setObjects(response.data.near_earth_objects);
            } catch (error) {
                setError('Failed to fetch data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchNEOData();
    }, []);

    if (loading) return <div className="text-center"><span className="spinner-border text-primary"></span></div>;
    if (error) return <div className="alert alert-danger" role="alert">{error}</div>;

    const formataData = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <div className="container py-5">
            <div className="row mb-4 align-items-center">
                <div className="col-md-2">
                    <img src={nasaLogo} alt="NASA Logo" className="img-fluid" />
                </div>
                <div className="col-md-10">
                    <h1 className="text-right">Objetos Próximos à Terra</h1>
                    <p className="text-secondary text-right">Informações sobre asteroides e cometas próximos ao nosso planeta.</p>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {objects.map((neo) => (
                    <div key={neo.id} className="col">
                        <div className="card h-100 shadow">
                            <img src={asteroidImage} className="card-img-top" alt="Asteroid" />
                            <div className="card-body">
                                <h5 className="card-title">{neo.name}</h5>
                                <p className="card-text">Diâmetro estimado: {neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
                                <p className="card-text">Observado de {formataData(neo.orbital_data.first_observation_date)} até {formataData(neo.orbital_data.last_observation_date)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
