import React, { useState } from 'react';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

const SubjectForm = ({ subject, onSubmit }) => {
    const [name, setName] = useState(subject ? subject.name : '');
    const [code, setCode] = useState(subject ? subject.code : '');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = subject ? `http://localhost:8080/api/subjects/${subject.id}` : 'http://localhost:8080/api/subjects';
        const method = subject ? axios.put : axios.post;
        
        method(url, { name, code })
            .then(response => {
                onSubmit();
                setSnackbarMessage(`Subject ${subject ? 'updated' : 'added'} successfully!`);
                setSnackbarSeverity('success');
                setOpenSnackbar(true);
            })
            .catch(error => {
                console.error(`Error ${subject ? 'updating' : 'adding'} subject:`, error);
                setSnackbarMessage(`Error ${subject ? 'updating' : 'adding'} subject.`);
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Subject Name"
                    required
                />
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Subject Code"
                    required
                />
                <button type="submit">{subject ? 'Update' : 'Add'} Subject</button>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default SubjectForm;
