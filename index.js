<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webhook Poster</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #2b2b2b;
            color: #ffffff;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #343434;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        h1 {
            text-align: center;
            color: #e91e63;
        }

        .input-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input[type="text"],
        input[type="number"],
        textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #555;
            border-radius: 4px;
            background-color: #222;
            color: #fff;
        }

        textarea {
            height: 100px;
        }

        .btn {
            background-color: #e91e63;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
            margin-right: 10px;
        }

        .btn:hover {
            background-color: #d81b60;
        }

        .stop {
            background-color: #ff5722;
        }

        .stop:hover {
            background-color: #e64a19;
        }

        .status {
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Discord Webhook Poster</h1>
        <form id="webhookForm">
            <div class="input-group">
                <label for="webhook">Webhook URL:</label>
                <input type="text" id="webhook" placeholder="Enter Webhook URL" required>
            </div>
            <div class="input-group">
                <label for="username">Username:</label>
                <input type="text" id="username" placeholder="Enter Username" required>
            </div>
            <div class="input-group">
                <label for="avatarUrl">Avatar URL:</label>
                <input type="text" id="avatarUrl" placeholder="Enter Avatar URL (optional)">
            </div>
            <div class="input-group">
                <label for="content">Message Content:</label>
                <textarea id="content" placeholder="Enter your message here" required></textarea>
            </div>
            <div class="input-group">
                <label for="interval">Spam Interval (ms):</label>
                <input type="number" id="interval" placeholder="Enter interval in milliseconds" value="2000" min="500">
            </div>
            <button type="button" id="postButton" class="btn">Send Message</button>
            <button type="button" id="stopButton" class="btn stop">Stop Posting</button>
        </form>
        <div id="statusMessage" class="status"></div>
    </div>

    <script>
        let postingInterval;
        let isPosting = false;

        document.getElementById('postButton').addEventListener('click', () => {
            const webhookUrl = document.getElementById('webhook').value;
            const username = document.getElementById('username').value;
            const avatarUrl = document.getElementById('avatarUrl').value;
            const content = document.getElementById('content').value;
            const interval = parseInt(document.getElementById('interval').value) || 2000;

            if (!isPosting) {
                isPosting = true;
                document.getElementById('statusMessage').innerText = "Started Posting...";

                postingInterval = setInterval(() => {
                    fetch(webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: username,
                            avatar_url: avatarUrl,
                            content: content
                        })
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log('Message sent');
                        } else {
                            console.error('Error sending message:', response.statusText);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }, interval); // Use the user-specified interval
            }
        });

        document.getElementById('stopButton').addEventListener('click', () => {
            if (isPosting) {
                clearInterval(postingInterval);
                isPosting = false;
                document.getElementById('statusMessage').innerText = "Stopped Posting.";
            }
        });
    </script>
</body>
</html>
