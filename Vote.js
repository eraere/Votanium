import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { TextField, Button, Container, Typography } from '@mui/material';

const socket = io('http://localhost:5000');

function Vote() {
    const [candidateId, setCandidateId] = useState('');

    useEffect(() => {
        socket.on('voteUpdate', (data) => {
            console.log('Vote update received:', data);
        });

        return () => {
            socket.off('voteUpdate');
        };
    }, []);

    const handleVote = () => {
        // Logic to interact with the smart contract
        console.log(`Voted for candidate ID: ${candidateId}`);
        socket.emit('vote', { candidateId });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Vote
            </Typography>
            <TextField
                label="Candidate ID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={candidateId}
                onChange={(e) => setCandidateId(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleVote}>
                Vote
            </Button>
        </Container>
    );
}

export default Vote; 