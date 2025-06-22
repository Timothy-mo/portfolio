const animatedSubtitle = document.querySelector('.animated-subtitle');
const phrases = [
  "Full-Stack Developer",
  "Visual Identity Designer"
];

let currentPhrase = 0;
let letterIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenPhrases = 1500;

function type() {
  const phrase = phrases[currentPhrase];
  if (!isDeleting) {
    animatedSubtitle.textContent = phrase.substring(0, letterIndex + 1);
    letterIndex++;

    if (letterIndex === phrase.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenPhrases);
      return;
    }
  } else {
    animatedSubtitle.textContent = phrase.substring(0, letterIndex - 1);
    letterIndex--;

    if (letterIndex === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
    }
  }
  setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

// Start animation on page load
document.addEventListener('DOMContentLoaded', () => {
  if (animatedSubtitle) {
    type();
  }
});
