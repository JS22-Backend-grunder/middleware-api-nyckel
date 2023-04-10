const express = require('express');
const app = express();
const PORT = 8000;

const todos = [
    { task: 'Köp kaffe' },
    { task: 'Köp kaka' },
    { task: 'Brygg kaffe' },
    { task: 'Drick kaffe' }
];

const apiKeys = [
    '7BTxHCyHhzIME5TI',
    'ngfeNG1iaq9Q2PJK',
    'zaCmZA74PLKCrD8Y',
    'KwOi5vm2TYNmi8Dd',
    'edVCa1E6zDZRztaq'
];

function auth(request, response, next) {
    const apiKey = request.headers['api-key'];

    if(apiKey && apiKeys.includes(apiKey)) {
        next();
    } else {
        const resObj = {
            error: 'Access denied! I find your lack of API-key disturbing!'
        }

        response.json(resObj);
    }
}

app.get('/api/todo', auth, (request, response) => {
    const resObj = {
        todos: todos
    }

    response.json(resObj);
});

app.get('/api/key', (request, response) => {
    const index = Math.floor(Math.random() * apiKeys.length);
    const apiKey = apiKeys[index];

    const resObj = {
        key: apiKey
    }

    response.json(resObj);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});