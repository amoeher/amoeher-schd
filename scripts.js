// Ensure the character container is always visible
const characterContainer = document.createElement('div');
characterContainer.style.position = 'fixed';
characterContainer.style.bottom = '10px';
characterContainer.style.right = '-5px';
characterContainer.style.width = '180px';
characterContainer.style.height = '250px';
characterContainer.style.zIndex = '100';
characterContainer.style.cursor = 'pointer';
characterContainer.style.borderRadius = '50%'; // Make it a perfect circle
characterContainer.style.overflow = 'hidden'; // Ensure only the head is visible
characterContainer.style.backgroundImage = 'url("./assets/MTH_HAPPY.png")'; // Replace with Mixuki's head image
characterContainer.style.backgroundSize = 'cover'; // Ensure the head fits well
characterContainer.style.backgroundPosition = 'center top'; // Position the head to look like it's peeking
characterContainer.style.transition = 'all 0.3s ease';
characterContainer.style.display = 'block'; // Always visible
document.body.appendChild(characterContainer);

const images = [
    './assets/MTH_HAPPY.png',
    './assets/MTH_O.png',
    './assets/MTH_SMILE.png',
]; // Array of action images
let currentIndex = 0;
let isBlinking = false;

// Change image on hover
characterContainer.addEventListener('mouseenter', () => {
    characterContainer.style.backgroundImage = 'url("./assets/MTH_SMILE_BLINK.png")';
});

characterContainer.addEventListener('mouseleave', () => {
    characterContainer.style.backgroundImage = `url("${images[currentIndex]}")`;
});

// Scroll to top and make the character "run away" on click
characterContainer.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    characterContainer.style.transition = 'all 0.5s ease';
    characterContainer.style.backgroundImage = 'url("./assets/MTH_HAPPY.png")';
});

// Animation logic for expressions and blinking
function startAnimation() {
    const randomExpressionInterval = Math.floor(Math.random() * 5000) + 4000; // Random time between 4-9 seconds for expressions
    const blinkInterval = 2000; // Fixed interval for blinking

    setTimeout(() => {
        if (isBlinking) {
            // Switch back to the current expression after blinking
            characterContainer.style.backgroundImage = `url("${images[currentIndex]}")`;
            isBlinking = false;
            startAnimation(); // Restart the animation cycle
        } else {
            // Blink or switch to the next expression
            if (Math.random() < 0.3) { // 30% chance to blink
                characterContainer.style.backgroundImage = `url("${images[currentIndex].replace('.png', '_BLINK.png')}")`;
                isBlinking = true;
                setTimeout(startAnimation, blinkInterval); // Shorter interval for blinking
            } else {
                // Switch to the next expression
                currentIndex = (currentIndex + 1) % images.length;
                characterContainer.style.backgroundImage = `url("${images[currentIndex]}")`;
                startAnimation(); // Restart the animation cycle
            }
        }
    }, isBlinking ? blinkInterval : randomExpressionInterval);
}

startAnimation(); // Start the animation cycle

// Language switch logic
const langEnBtn = document.getElementById('lang-en');
const langJpBtn = document.getElementById('lang-jp');
const textElements = document.querySelectorAll('[data-en], [data-jp]');

langEnBtn.addEventListener('click', () => {
    textElements.forEach(el => {
        el.textContent = el.getAttribute('data-en');
    });
});

langJpBtn.addEventListener('click', () => {
    textElements.forEach(el => {
        el.textContent = el.getAttribute('data-jp');
    });
});