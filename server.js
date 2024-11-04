const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Proxy list (update with your own proxies)
// Proxy list (update with your own proxies)
const proxies = [
    { host: '104.207.36.42', port: 3128 },
    { host: '156.228.0.201', port: 3128 },
    { host: '156.228.190.27', port: 3128 },
    { host: '104.207.34.172', port: 3128 },
    { host: '156.228.85.33', port: 3128 },
    { host: '156.253.173.90', port: 3128 },
    { host: '154.94.12.178', port: 3128 },
    { host: '156.228.103.154', port: 3128 },
    { host: '156.253.173.130', port: 3128 },
    { host: '45.201.10.119', port: 3128 },
    { host: '156.228.91.176', port: 3128 },
    { host: '156.228.90.107', port: 3128 },
    { host: '156.228.111.217', port: 3128 },
    { host: '156.228.84.100', port: 3128 },
    { host: '156.240.99.126', port: 3128 },
    { host: '156.228.87.149', port: 3128 },
    { host: '156.228.171.102', port: 3128 },
    { host: '156.228.80.177', port: 3128 },
    { host: '156.233.86.183', port: 3128 },
    { host: '154.213.203.69', port: 3128 },
    { host: '104.207.51.25', port: 3128 },
    { host: '156.253.166.61', port: 3128 },
    { host: '156.228.94.46', port: 3128 },
    { host: '156.253.171.56', port: 3128 },
    { host: '104.167.28.121', port: 3128 },
    { host: '156.228.112.153', port: 3128 },
    { host: '156.228.87.123', port: 3128 },
    { host: '156.228.115.37', port: 3128 },
    { host: '104.167.29.123', port: 3128 },
    { host: '104.207.61.174', port: 3128 },
    { host: '156.228.107.83', port: 3128 },
    { host: '156.228.185.64', port: 3128 },
    { host: '156.233.91.219', port: 3128 },
    { host: '104.207.52.24', port: 3128 },
    { host: '156.253.167.6', port: 3128 },
    { host: '156.228.0.108', port: 3128 },
    { host: '156.228.190.77', port: 3128 },
    { host: '154.213.195.124', port: 3128 },
    { host: '104.207.62.54', port: 3128 },
    { host: '156.228.109.255', port: 3128 },
    { host: '156.253.165.253', port: 3128 },
    { host: '156.228.98.158', port: 3128 },
    { host: '104.207.38.244', port: 3128 },
    { host: '156.228.113.83', port: 3128 },
    { host: '156.228.77.11', port: 3128 },
    { host: '104.207.32.81', port: 3128 },
    { host: '156.228.83.222', port: 3128 },
    { host: '104.207.42.238', port: 3128 },
    { host: '104.207.41.151', port: 3128 },
    { host: '156.233.86.96', port: 3128 },
    { host: '156.233.91.50', port: 3128 },
    { host: '156.228.89.132', port: 3128 },
    { host: '104.207.33.147', port: 3128 },
    { host: '156.228.104.85', port: 3128 },
    { host: '156.228.111.228', port: 3128 },
    { host: '156.228.114.54', port: 3128 },
    { host: '104.207.41.132', port: 3128 },
    { host: '156.233.85.252', port: 3128 },
    { host: '154.213.195.201', port: 3128 },
    { host: '156.228.106.88', port: 3128 },
    { host: '156.253.171.93', port: 3128 },
    { host: '45.202.79.27', port: 3128 },
    { host: '156.228.81.239', port: 3128 },
    { host: '104.207.44.32', port: 3128 },
    { host: '156.228.181.147', port: 3128 },
    { host: '156.253.176.189', port: 3128 },
    { host: '156.228.125.33', port: 3128 },
    { host: '104.207.37.97', port: 3128 },
    { host: '156.228.100.154', port: 3128 },
    { host: '104.207.60.42', port: 3128 },
    { host: '156.233.87.29', port: 3128 },
    { host: '156.228.125.96', port: 3128 },
    { host: '156.228.101.178', port: 3128 },
    { host: '156.228.185.60', port: 3128 },
    { host: '104.167.25.79', port: 3128 },
    { host: '104.207.47.112', port: 3128 },
    { host: '156.253.174.121', port: 3128 },
    { host: '156.253.179.193', port: 3128 },
    { host: '156.253.179.2', port: 3128 },
    { host: '156.233.90.56', port: 3128 },
    { host: '156.233.89.160', port: 3128 },
    { host: '104.207.63.213', port: 3128 },
    { host: '104.207.56.203', port: 3128 },
    { host: '156.228.181.204', port: 3128 },
    { host: '154.213.203.231', port: 3128 },
    { host: '104.207.52.168', port: 3128 },
    { host: '156.228.182.77', port: 3128 },
    { host: '156.228.94.126', port: 3128 },
    { host: '154.213.194.241', port: 3128 },
    { host: '156.228.92.116', port: 3128 },
    { host: '156.228.83.15', port: 3128 },
    { host: '104.207.36.186', port: 3128 },
    { host: '156.228.80.248', port: 3128 },
    { host: '156.253.175.177', port: 3128 },
    { host: '104.207.55.197', port: 3128 },
    { host: '154.213.203.77', port: 3128 },
    { host: '104.207.52.75', port: 3128 },
    { host: '156.228.113.33', port: 3128 },
    { host: '156.228.176.92', port: 3128 },
    { host: '104.207.54.196', port: 3128 },
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
