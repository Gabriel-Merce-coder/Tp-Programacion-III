import { useState, useMemo } from 'react';

const useMovieSearch = (peliculas) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPeliculas = useMemo(() => {
        if (!searchTerm.trim()) {
            return peliculas;
        }

        return peliculas.filter(pelicula =>
            pelicula.titulo.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [peliculas, searchTerm]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    return {
        searchTerm,
        filteredPeliculas,
        handleSearchChange
    };
};

export default useMovieSearch;
