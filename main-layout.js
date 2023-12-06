document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        const loadingScreen = document.getElementById("loading-screen");
        loadingScreen.style.display = "none";

        const currentTime = new Date().getHours();

        if (currentTime >= 4 && currentTime < 20) {
            document.getElementById("chat-container").style.display = "block";
            function playDaytimeSound() {
                const audio = new Audio("asset/song/halo.wav");
                audio.play();
            }
            playDaytimeSound();
        } else {
            const songs = ['asset/song/lemon.wav'];
            let currentSongIndex = 0;
            function playNighttimeSound() {
                const audio = new Audio(songs[currentSongIndex]);
                audio.play();
                currentSongIndex = (currentSongIndex + 1) % songs.length;
            }

            document.getElementById("tidur-container").style.display = "block";
            playNighttimeSound();
        }

        const chatDisplay = document.getElementById("chat-display");
        const initialMessage = createChatBubble("Selamat datang! Ada yang bisa saya bantu? \n Ketik 'help' untuk bantuan.");
        chatDisplay.appendChild(initialMessage);

        setTimeout(function () {
            chatDisplay.removeChild(initialMessage);
        }, 10000);
    }, 9000);

    window.kirimPesan = function () {
        const userInput = document.getElementById("pesan").value;
        const chatDisplay = document.getElementById("chat-display");
        clearChatDisplay(chatDisplay);

        const chatBubble = createChatBubble(handleUserInput(userInput.toLowerCase()));
        chatDisplay.appendChild(chatBubble);

        fadeInElement(chatBubble, 100);
        document.getElementById("pesan").value = "";

        setTimeout(function () {
            chatDisplay.removeChild(chatBubble);
        }, 240000);
    };

    loadResponses();
});

function playSound(songs) {
    const audio = new Audio(songs[Math.floor(Math.random() * songs.length)]);
    audio.play();
}

function createChatBubble(text) {
    const chatBubble = document.createElement("div");
    chatBubble.className = "chat-bubble bot-response";
    chatBubble.className = "chat-bubble bot-response";
    chatBubble.innerHTML = text.replace(/\n/g, "<br>");
    return chatBubble;
}

function clearChatDisplay(chatDisplay) {
    while (chatDisplay.firstChild) {
        chatDisplay.removeChild(chatDisplay.firstChild);
    }
}

function fadeInElement(element, duration) {
    setTimeout(function () {
        element.style.opacity = 1;
    }, duration);
}
