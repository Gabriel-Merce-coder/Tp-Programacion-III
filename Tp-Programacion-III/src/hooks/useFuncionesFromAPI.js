import { useState, useEffect } from 'react';

const useFuncionesFromAPI = () => {
    const [funciones, setFunciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFunciones = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:3000/api/funcion', {
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
    }, []);

    return { funciones, loading, error };
};

export default useFuncionesFromAPI;
