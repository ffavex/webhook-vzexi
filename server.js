const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const HttpsProxyAgent = require('https-proxy-agent');

const app = express();
app.use(bodyParser.json());

app.post('/postWebhook', async (req, res) => {
    const { webhookUrl, username, avatarUrl, content, proxy } = req.body;

    try {
        const agent = proxy ? new HttpsProxyAgent(`http://${proxy}`) : null;

        const response = await axios.post(webhookUrl, {
            username,
            avatar_url: avatarUrl,
            content,
        }, { 
            httpsAgent: agent 
        });

        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error sending message:', error.message);
        // Respond with rate limit status
        if (error.response && error.response.status === 429) {
            return res.status(429).send('Rate limit reached');
        }
        res.status(500).send('Error sending message');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
