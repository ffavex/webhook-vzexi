const proxies = [
    '104.207.36.42:3128',
    '156.228.0.201:3128',
    '156.228.190.27:3128',
    '104.207.34.172:3128',
    // Add more proxies here
];

let currentProxyIndex = 0;
let postingInterval = null;

function getCurrentProxy() {
    return proxies[currentProxyIndex];
}

async function postToWebhook(webhookUrl, avatarUrl, name, content) {
    const proxy = getCurrentProxy();
    const body = JSON.stringify({
        avatar_url: avatarUrl,
        username: name,
        content: content
    });

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Proxy-Connection': 'keep-alive',
            },
            body: body,
            // For browser-side, proxy support isn't straightforward.
            // You might need to implement this on the server-side.
            // agent: new HttpsProxyAgent(`http://${proxy}`) // Uncomment if using Node.js
        });

        if (response.ok) {
            console.log('Posted successfully using proxy:', proxy);
            document.getElementById('status').innerText = 'Posted successfully!';
        } else {
            console.log('Failed to post, status:', response.status);
            throw new Error(`Rate limited with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error posting to webhook:', error);
        currentProxyIndex++;

        if (currentProxyIndex < proxies.length) {
            document.getElementById('status').innerText = 'Switching to next proxy...';
            await postToWebhook(webhookUrl, avatarUrl, name, content); // Retry with the next proxy
        } else {
            console.error('All proxies have been tried and failed.');
            document.getElementById('status').innerText = 'All proxies have failed.';
        }
    }
}

async function startSpamming(event) {
    event.preventDefault();
    const webhookUrl = document.getElementById('webhook').value;
    const avatarUrl = document.getElementById('avatarUrl').value;
    const name = document.getElementById('name').value;
    const content = document.getElementById('content').value;
    const interval = parseInt(document.getElementById('interval').value, 10);

    if (postingInterval) {
        clearInterval(postingInterval); // Clear any existing interval
    }

    postingInterval = setInterval(() => {
        postToWebhook(webhookUrl, avatarUrl, name, content);
    }, interval);
}

document.getElementById('webhookForm').addEventListener('submit', startSpamming);
