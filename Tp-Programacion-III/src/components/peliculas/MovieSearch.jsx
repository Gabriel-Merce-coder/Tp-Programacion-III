import { useState } from 'react';
import { Form } from 'react-bootstrap';

const MovieSearch = ({ onSearchChange }) => {
    const [searchTitulo, setSearchTitulo] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTitulo(value);
        onSearchChange(value);
    };

    return (
        <div className="position-relative d-inline-block">
            <Form.Control
                type="text"
                placeholder="Buscar..."
                value={searchTitulo}
                onChange={handleInputChange}
                className="bg-dark text-white border-secondary rounded-pill pe-5 ps-3"
                style={{ width: '200px', fontSize: '14px' }}
            />
            <span className="position-absolute top-50 end-0 translate-middle-y text-white me-3">
                🔍
            </span>
        </div>
    );
};

export default MovieSearch;
