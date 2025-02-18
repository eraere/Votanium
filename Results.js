import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';

const socket = io('http://localhost:5000');

function Results() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        socket.on('voteUpdate', (data) => {
            // Update results based on data
            console.log('Vote update received:', data);
            // Fetch updated results from server or update state directly
        });

        return () => {
            socket.off('voteUpdate');
        };
    }, []);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Voting Results
            </Typography>
            <List>
                {results.map((result, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`Candidate ${result.candidateId}: ${result.voteCount} votes`} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default Results; 