import { useState, useEffect } from 'react';

const useFuncionesByPelicula = (peliculaId) => {
    const [funciones, setFunciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!peliculaId) {
            setFunciones([]);
            return;
        }

        const fetchFunciones = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');

                const response = await fetch(`http://localhost:3000/api/funcion/${peliculaId}`, {
                    headers: {
                        'x-token': token,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al cargar las funciones');
                }

                const data = await response.json();
                setFunciones(data.funciones || []);
            } catch (err) {
                setError(err.message);
                setFunciones([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFunciones();
    }, [peliculaId]);

    return { funciones, loading, error };
};

export default useFuncionesByPelicula;
