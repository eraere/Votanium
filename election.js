const express = require('express');
const router = express.Router();
const Election = require('../models/Election');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

// Create a new election (admin only)
router.post('/create', auth, role('admin'), async (req, res) => {
    const { name } = req.body;
    const election = new Election({ name });
    await election.save();
    res.send('Election created');
});

// Add a candidate to an election (admin only)
router.post('/:electionId/candidate', auth, role('admin'), async (req, res) => {
    const { electionId } = req.params;
    const { name } = req.body;
    const election = await Election.findById(electionId);
    election.candidates.push({ name });
    await election.save();
    res.send('Candidate added');
});

// End an election
router.post('/:electionId/end', async (req, res) => {
    const { electionId } = req.params;
    const election = await Election.findById(electionId);
    election.isActive = false;
    await election.save();
    res.send('Election ended');
});

module.exports = router; 