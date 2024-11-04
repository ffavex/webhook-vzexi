const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Proxy list (update with your own proxies)
const proxies = [
    { host: 'proxy1.example.com', port: 8080 },
    { host: 'proxy2.example.com', port: 8080 },
    // Add more proxies here
];

let currentProxyIndex = 0;

// Function to rotate and get the next proxy
function getNextProxy() {
    const proxy = proxies[currentProxyIndex];
    currentProxyIndex = (currentProxyIndex + 1) % proxies.length;
    return `http://${proxy.host}:${proxy.port}`;
}

app.post('/postWebhook', async (req, res) => {
    const { webhookUrl, username, avatarUrl, content } = req.body;
    const proxy = getNextProxy();

    try {
        await axios.post(webhookUrl, {
            username: username,
            avatar_url: avatarUrl,
            content: content
        }, {
            proxy: {
                host: proxy.host,
                port: proxy.port
            }
        });
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Error sending message');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
