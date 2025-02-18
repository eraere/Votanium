// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Election {
        uint id;
        string name;
        bool isActive;
        mapping(uint => Candidate) candidates;
        uint candidatesCount;
    }

    mapping(uint => Election) public elections;
    mapping(address => mapping(uint => bool)) public voters;
    uint public electionsCount;

    event ElectionCreated(uint indexed electionId, string name);
    event Voted(uint indexed electionId, uint indexed candidateId);

    function createElection(string memory _name) public {
        electionsCount++;
        elections[electionsCount] = Election(electionsCount, _name, true);
        emit ElectionCreated(electionsCount, _name);
    }

    function addCandidate(uint _electionId, string memory _name) public {
        Election storage election = elections[_electionId];
        require(election.isActive, "Election is not active");
        election.candidatesCount++;
        election.candidates[election.candidatesCount] = Candidate(election.candidatesCount, _name, 0);
    }

    function vote(uint _electionId, uint _candidateId) public {
        Election storage election = elections[_electionId];
        require(election.isActive, "Election is not active");
        require(!voters[msg.sender][_electionId], "You have already voted in this election");
        require(_candidateId > 0 && _candidateId <= election.candidatesCount, "Invalid candidate ID");

        voters[msg.sender][_electionId] = true;
        election.candidates[_candidateId].voteCount++;

        emit Voted(_electionId, _candidateId);
    }

    function endElection(uint _electionId) public {
        Election storage election = elections[_electionId];
        require(election.isActive, "Election is already ended");
        election.isActive = false;
    }
} 