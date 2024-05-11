import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ExplorerView() {
    const [explorers, setExplorers] = useState([]);

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
  return (
    <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
        <h4 class="py-3 mb-4"><span class="text-muted fw-light">Explore Swimming World</span></h4>
            <div className="row">
                <div className="row mb-5">
                {explorers.map(explorer => (
                <div className="col-6">
                    <div className="card mb-3">
                    <div className="row g-0">
                        <div className="col-md-6">
                        <div className="card-body">
                                <iframe 
                                src={explorer.url}
                                title="YouTube video player"
                                className="card-iframe"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                            <h5 className="card-title">{explorer.title}</h5>
                            <p className="card-text">
                            {explorer.description}
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                ))}
                </div>

            </div>
        </div>
    </div>
  )
}

export default ExplorerView