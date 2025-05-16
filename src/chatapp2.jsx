<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real-Time Chat App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        #chat {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        #messages {
            max-height: 400px;
            overflow-y: auto;
            margin-bottom: 10px;
        }
        #messages div {
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
        }
        .my-message {
            background-color: #aee2ff;
            text-align: right;
        }
        .other-message {
            background-color: #f1f1f1;
        }
        input[type="text"] {
            width: calc(100% - 100px);
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            width: 80px;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="chat">
        <div id="messages"></div>
        <input type="text" id="messageInput" placeholder="Type a message...">
        <button id="sendBtn">Send</button>
    </div>

    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js"></script>

    <script>
        // Initialize Firebase
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "YOUR_AUTH_DOMAIN",
            projectId: "YOUR_PROJECT_ID",
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID"
        };
        const app = firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore(app);

        const messagesRef = db.collection('messages');
        const messagesContainer = document.getElementById('messages');
        const messageInput = document.getElementById('messageInput');
        const sendBtn = document.getElementById('sendBtn');

        // Listen for new messages in Firestore
        messagesRef.orderBy('timestamp').onSnapshot(snapshot => {
            messagesContainer.innerHTML = ''; // Clear the messages container
            snapshot.forEach(doc => {
                const messageData = doc.data();
                const messageDiv = document.createElement('div');
                messageDiv.textContent = `${messageData.user}: ${messageData.text}`;
                messageDiv.className = messageData.user === "Me" ? "my-message" : "other-message";
                messagesContainer.appendChild(messageDiv);
            });
            messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to the latest message
        });

        // Send a message
        sendBtn.addEventListener('click', async () => {
            const messageText = messageInput.value.trim();
            if (messageText !== '') {
                await messagesRef.add({
                    user: 'Me',
                    text: messageText,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                messageInput.value = ''; // Clear the input
            }
        });

        // Send a message when pressing Enter
        messageInput.addEventListener('keypress', event => {
            if (event.key === 'Enter') {
                sendBtn.click();
            }
        });
    </script>
</body>
</html>
