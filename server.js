// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

// Replace with your RapidAPI Key
const RAPIDAPI_KEY = '382c98c0f2mshd2439a352019cf2p1bfac3jsncfd8cdbe45a3';

// Base RapidAPI URL for Highlightly
const BASE_URL = 'https://highlightly.p.rapidapi.com/highlights';

// Utility to fetch highlights from Highlightly
async function fetchHighlights(sport) {
    try {
        const url = `${BASE_URL}?sport=${sport}`; // use query param
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'highlightly.p.rapidapi.com'
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(`Error fetching ${sport} highlights:`, err);
        return { error: `Failed to fetch ${sport} highlights` };
    }
}

// Single test endpoint for MLS highlights
app.get('/mls', async (req, res) => {
    const highlights = await fetchHighlights('mls');
    res.json(highlights);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Highlightly proxy running on port ${PORT}`);
});
