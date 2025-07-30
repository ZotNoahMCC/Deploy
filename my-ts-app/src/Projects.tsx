import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchProjects } from './portfolioSlice';
export default function Projects() {

const [isVisible, setIsVisible] = useState(false);
const dispatch = useAppDispatch();
const projects = useAppSelector((state) => state.portfolio.projects);
const status = useAppSelector((state) => state.portfolio.status);
const error = useAppSelector((state) => state.portfolio.error);

    useEffect(() => {
        if (status === 'idle') {
        dispatch(fetchProjects());
        } 
    }, [status, dispatch]);

    const toggleVisibility = () => {
    setIsVisible(!isVisible);
    };

    return (
        <div>
            <button onClick={toggleVisibility}>
            {isVisible ? 'Hide Data' : 'Show Data'}
            </button>
            {isVisible && (
            <div>
                <h1>Projects queried from SQLite</h1>
                {status === 'loading' && <p>Loading...</p>}
                {status === 'failed' && <p>Error: {error}</p>}
                {status === 'succeeded' && (
                <ul>
                    {projects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                ))}
                </ul>

            )}

            </div>
            )}
        </div>
    );
}