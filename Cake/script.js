const themeButtons = document.querySelectorAll('.theme-btn');
const button = document.getElementById('clickButton');
const counter = document.getElementById('counter');
const wish = document.getElementById('wish');

let clickCount = 0;

// Create audio element programmatically
const birthdaySong = new Audio('audio/birthday_song.mp3');
birthdaySong.volume = 1.0; // Set volume to maximum

// Add these emojis at the top of your file
const clickEmojis = ['🎈', '✨', '🎉', '🎊', '⭐', '🌟', '🍰', '🎂'];

// Add this constant at the top with other constants
const clickSound = new Audio('audio/pop-94319.mp3');
clickSound.volume = 0.3; // Set volume to 30%

// Add these messages at the top with other constants
const messages = [
    "Keep going! You're doing great! 🌟",
    "Almost there! Keep clicking! 🎯",
    "You're making progress! 🚀",
    "Every click counts! 💫",
    "You're getting closer! 🎈",
    "Don't give up! You got this! ✨",
    "Click your way to success! 🌈",
    "The surprise is worth it! 🎁",
    "Keep the rhythm going! 🎵",
    "You're a clicking champion! 👑"
];

// Add this function to get a random message
function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}

button.addEventListener('click', (e) => {
    // Play click sound
    clickSound.currentTime = 0; // Reset sound to start
    try {
        clickSound.play();
    } catch (error) {
        console.error("Error playing click sound:", error);
    }

    clickCount += 1;
    
    // Update counter with random message every 10 clicks
    if (clickCount % 10 === 0) {
        counter.textContent = `Clicks: ${clickCount} - ${getRandomMessage()}`;
    } else {
        counter.textContent = `Clicks: ${clickCount}`;
    }
    
    // Add button pop animation
    button.classList.add('button-click');
    setTimeout(() => button.classList.remove('button-click'), 300);

    // Create emoji burst
    const emoji = document.createElement('span');
    emoji.className = 'emoji-burst';
    emoji.textContent = clickEmojis[Math.floor(Math.random() * clickEmojis.length)];
    
    // Position emoji at click coordinates
    const rect = button.getBoundingClientRect();
    emoji.style.left = (e.clientX - rect.left) + 'px';
    emoji.style.top = (e.clientY - rect.top) + 'px';
    
    button.appendChild(emoji);
    setTimeout(() => emoji.remove(), 1000);

    // Add rainbow effect after 50 clicks
    if (clickCount >= 50) {
        button.classList.add('rainbow-border');
    }
    
    if (clickCount >= 100) {
        wish.classList.remove('hidden');
        button.disabled = true;
        button.textContent = "You did it! 🎉";
        document.body.classList.add('show-poppers');
        triggerConfetti();
        
        try {
            birthdaySong.play();
            console.log("Attempting to play audio");
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    }
});

// Add this function to create animated background elements
function createBackgroundElements(theme) {
    // Remove existing background elements
    document.querySelectorAll('.star, .bubble, .heart').forEach(el => el.remove());
    
    const container = document.body;
    const numElements = 30;
    
    for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        
        // Set element properties based on theme
        switch(theme) {
            case 'purple':
                element.className = 'star';
                element.style.left = `${Math.random() * 100}vw`;
                element.style.top = `${Math.random() * 100}vh`;
                element.style.animationDelay = `${Math.random() * 2}s`;
                break;
                
            case 'blue':
                element.className = 'bubble';
                element.style.left = `${Math.random() * 100}vw`;
                element.style.animationDelay = `${Math.random() * 8}s`;
                element.style.width = element.style.height = `${5 + Math.random() * 10}px`;
                break;
                
            case 'pink':
                element.className = 'heart';
                element.innerHTML = '❤';
                element.style.left = `${Math.random() * 100}vw`;
                element.style.animationDelay = `${Math.random() * 6}s`;
                break;
        }
        
        container.appendChild(element);
    }
}

// Modify the theme switching code
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.dataset.theme;
        const hasPoppers = document.body.classList.contains('show-poppers');
        document.body.className = '';
        document.body.classList.add(`${theme}-theme`);
        if (hasPoppers) {
            document.body.classList.add('show-poppers');
        }
        
        // Create new background elements for the theme
        createBackgroundElements(theme);
        
        // Save theme preference
        localStorage.setItem('birthday-theme', theme);
    });
});

// Modify the DOMContentLoaded event to include background elements
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('birthday-theme');
    const theme = savedTheme || 'pink';
    document.body.classList.add(`${theme}-theme`);
    createBackgroundElements(theme);
});

function triggerConfetti() {
    // Create multiple confetti bursts
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0.5,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['star'],
        colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
    };

    function shoot() {
        confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ['star']
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle']
        });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
    setTimeout(shoot, 300);
    setTimeout(shoot, 400);
}


