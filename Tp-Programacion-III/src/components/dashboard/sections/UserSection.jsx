import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Mymodal from '../../ui/Mymodal';

const UserSection = () => {
    const [users, setUsers] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showRoleConfirm, setShowRoleConfirm] = useState(false);
    const [selectedRoleUser, setSelectedRoleUser] = useState(null);
    const [newRole, setNewRole] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3000/api/user', {
                headers: {
                    'x-token': token
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.users || data || []);
            } else {
                toast.error('Error al cargar los usuarios');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error de conexión');
        }
    };

    const handleStatusClick = (user) => {
        setSelectedUser(user);
        setShowConfirm(true);
    };

    const confirmStatusChange = async () => {
        if (!selectedUser) return;

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3000/api/user/${selectedUser.id}`, {
                method: 'PATCH',
                headers: {
                    'x-token': token
                }
            });

            if (response.ok) {
                const data = await response.json();
                const newStatus = data.newStatus;

                setUsers(users.map(user =>
                    user.id === selectedUser.id
                        ? { ...user, estado: newStatus }
                        : user
                ));
                toast.success(data.message);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || errorData.message || 'Error al actualizar el estado del usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error de conexión');
        } finally {
            setShowConfirm(false);
            setSelectedUser(null);
        }
    };

    const handleRoleChange = (user, newRole) => {
        setSelectedRoleUser(user);
        setNewRole(newRole);
        setShowRoleConfirm(true);
    };

    const confirmRoleChange = async () => {
        if (!selectedRoleUser || !newRole) return;

        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:3000/api/user/${selectedRoleUser.id}/role`, {
                method: 'PUT',
                headers: {
                    'x-token': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    role: newRole
                })
            });

            if (response.ok) {
                const data = await response.json();

                setUsers(users.map(user =>
                    user.id === selectedRoleUser.id
                        ? { ...user, role: newRole }
                        : user
                ));
                toast.success(data.message);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || errorData.message || 'Error al actualizar el rol del usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error de conexión');
        } finally {
            setShowRoleConfirm(false);
            setSelectedRoleUser(null);
            setNewRole('');
        }
    };



    return (
        <>
            <Container className="py-4">
                <Row>
                    <Col>
                        <Card className="bg-dark text-white">
                            <Card.Header className="bg-secondary">
                                <h4 className="mb-0">Gestión de Usuarios</h4>
                            </Card.Header>
                            <Card.Body>

                                {users.length === 0 ? (
                                    <div className="text-center py-4">
                                        <p className="text-muted">No hay usuarios registrados</p>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <Table striped bordered hover variant="dark" size="sm">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Email</th>
                                                    <th>Rol</th>
                                                    <th>Estado</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>{user.fullName || user.nombre || 'N/A'}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            <select
                                                                className="form-select form-select-sm bg-secondary text-white border-secondary"
                                                                value={user.role}
                                                                onChange={(e) => handleRoleChange(user, e.target.value)}
                                                            >
                                                                <option value="user">user</option>
                                                                <option value="admin">admin</option>
                                                                <option value="superadmin">superadmin</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <Badge
                                                                bg={user.estado ? 'success' : 'danger'}
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => handleStatusClick(user)}
                                                            >
                                                                {user.estado ? 'Activo' : 'Inactivo'}
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Mymodal
                show={showConfirm}
                onHide={() => {
                    setShowConfirm(false);
                    setSelectedUser(null);
                }}
                onConfirm={confirmStatusChange}
                title="Confirmar cambio de estado"
                message={`¿Estás seguro de ${selectedUser?.estado ? 'desactivar' : 'activar'} al usuario ${selectedUser?.fullName || selectedUser?.nombre || 'N/A'}?`}
                confirmText={selectedUser?.estado ? 'Sí, desactivar' : 'Sí, activar'}
                cancelText="No, cancelar"
            />

            <Mymodal
                show={showRoleConfirm}
                onHide={() => {
                    setShowRoleConfirm(false);
                    setSelectedRoleUser(null);
                    setNewRole('');
                }}
                onConfirm={confirmRoleChange}
                title="Confirmar cambio de rol"
                message={`¿Estás seguro de cambiar el rol de ${selectedRoleUser?.fullName || selectedRoleUser?.nombre || 'N/A'} a ${newRole}?`}
                confirmText="Sí, cambiar rol"
                cancelText="No, cancelar"
            />
        </>
    );
};

export default UserSection;
