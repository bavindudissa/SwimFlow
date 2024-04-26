import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Explorer() {
    const [explorers, setExplorers] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        url: '',
        type: 'video'
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchExplorerList();
    }, []);

    const fetchExplorerList = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/explorers/list');
            setExplorers(response.data.data);
        } catch (error) {
            console.error('Error fetching explorer list:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                await axios.put(`http://localhost:3001/api/v1/explorers/${editId}`, formData);
                const updatedExplorers = explorers.map(explorer => {
                    if (explorer._id === editId) {
                        return { ...explorer, ...formData };
                    }
                    return explorer;
                });
                setExplorers(updatedExplorers);
                setEditMode(false);
                setEditId(null);
            } else {
                const response = await axios.post('http://localhost:3001/api/v1/explorers', formData);
                setExplorers([...explorers, response.data.data]);
            }
            setFormData({ title: '', description: '', url: '', type: '' });
            setError('');
            setSuccess('Changes saved successfully.');
        } catch (error) {
            setError(error.response.data.message);
            console.error('Error creating/updating explorer:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/v1/explorers/${id}`);
            setExplorers(explorers.filter(explorer => explorer._id !== id));
            setError('');
        } catch (error) {
            setError(error.response.data.message);
            console.error('Error deleting explorer:', error);
        }
    };

    const handleEdit = (explorer) => {
        setFormData({ title: explorer.title, description: explorer.description, url: explorer.url, type: explorer.type });
        setEditMode(true);
        setEditId(explorer._id);
    };

    return (
        <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                    <div className="col-xl">
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Explorer Details</h5>
                                <small className="text-muted float-end">Default label</small>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className='row'>
                                        <div className="mb-3 col-3">
                                            <label className="form-label" htmlFor="title">Title</label>
                                            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3 col-3">
                                            <label className="form-label" htmlFor="description">Description</label>
                                            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                                        </div>
                                        <div className="mb-3 col-3">
                                            <label className="form-label" htmlFor="url">Url</label>
                                            <input type="text" className="form-control" id="url" name="url" value={formData.url} onChange={handleChange} />
                                        </div>
                                        <div className="mb-3 col-3">
                                            <label className="form-label" htmlFor="type">Explorer Type</label>
                                            <select className="form-select" id="type" name="type" value={formData.type} onChange={handleChange}>
                                                <option selected disabled>Open this select menu</option>
                                                <option value={"video"}>Video</option>
                                                <option value={"link"}>Link</option>
                                                <option value={"blog"}>Blog</option>
                                            </select>
                                        </div>
                                    </div>
                                    {error && <p className="text-danger">{error}</p>}
                                    {success && <p className="text-success">{success}</p>}
                                    <button type="submit" className="btn btn-primary me-2">{editMode ? 'Save Changes' : 'Add Explorer'}</button>
                                    <button type="reset" className="btn btn-outline-secondary">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Url</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {explorers.map(explorer => (
                                    <tr key={explorer._id}>
                                        <td>{explorer.title}</td>
                                        <td>{explorer.description}</td>
                                        <td>{explorer.url}</td>
                                        <td>{explorer.type}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(explorer)}>Edit</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(explorer._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Explorer;
