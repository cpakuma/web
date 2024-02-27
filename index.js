const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const stopBtn = document.getElementById('stopBtn');
const nextBtn = document.getElementById('nextBtn');
const progress = document.getElementById('progress');

const musicList = ['./src/music.mp3', './src/music2.mp3'];
const imageList = ['./src/img.jpg', './src/img2.jpg'];
let currentMusicIndex = 0;

function playNextMusic() {
    currentMusicIndex = (currentMusicIndex + 1) % musicList.length;
    audio.src = musicList[currentMusicIndex];
    document.querySelector('.album-art img').src = imageList[currentMusicIndex];
    audio.play();
    playPauseBtn.textContent = 'Pause';
    document.querySelector('.album-art img').classList.add('rotate');
}

playPauseBtn.addEventListener('click', () => {
    if (audio.paused || audio.ended) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
        document.querySelector('.album-art img').classList.add('rotate');
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
        document.querySelector('.album-art img').classList.remove('rotate');
    }
});

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseBtn.textContent = 'Play';
    document.querySelector('.album-art img').classList.remove('rotate');
});

nextBtn.addEventListener('click', playNextMusic);

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressWidth = (currentTime / duration) * 100;
    progress.style.width = `${progressWidth}%`;
});

audio.addEventListener('ended', () => {
    document.querySelector('.album-art img').classList.remove('rotate');
});

const track = document.querySelector(".volume-slider");
const volume_value_el = document.querySelector(".volume-value");
const body = document.querySelector("body");

const changeBgTo = (color) => (track.style.background = color);

track.addEventListener("input", () => {
    const value = track.value;

    volume_value_el.innerText = value;
    volume_value_el.style.opacity = 1;
    track.style.boxShadow = "0 0px 15px red";
});

track.addEventListener("change", () => {
    setTimeout(() => {
        volume_value_el.style.opacity = 0;
        track.style.boxShadow = "0 0px 15px transparent";
    }, 1000);
});

track.addEventListener("input", () => {
    const value = track.value;
    setVolume(value);
    
    volume_value_el.innerText = value;
    volume_value_el.style.opacity = 1;
    track.style.boxShadow = "0 0px 15px red";
});

track.addEventListener("change", () => {
    setTimeout(() => {
        volume_value_el.style.opacity = 0;
        track.style.boxShadow = "0 0px 15px transparent";
    }, 1000);
});

function setVolume(volume) {
    const normalizedVolume = volume / 100;
    audio.volume = normalizedVolume;
}

const progressIndicator = document.getElementById('progress');
const progressBar = document.querySelector('.progress-bar');

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressWidth = (currentTime / duration) * 100;
    progressIndicator.style.width = `${progressWidth}%`;
});

progressBar.addEventListener('click', (event) => {
    const progressBarWidth = progressBar.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;
    const newTime = (clickX / progressBarWidth) * duration;
    audio.currentTime = newTime;
});

progressBar.addEventListener('selectstart', (event) => {
    event.preventDefault();
});

document.addEventListener("DOMContentLoaded", function() {
    const socialsSvg = document.querySelector(".socials > svg");
    const imageModal = document.getElementById("imageModal");
    const modalContent = document.querySelector(".modal-content");
    const notification = document.getElementById("notification");

    socialsSvg.addEventListener("click", function() {
        imageModal.style.display = "block";
        modalContent.src = "./src/dc.png";
        imageModal.classList.add('fadeIn');

        showNotification();
    });

    imageModal.addEventListener("click", function(event) {
        if (event.target === imageModal || event.target === modalContent) {
            imageModal.classList.remove('fadeIn');
            imageModal.classList.add('fadeOut');
            setTimeout(() => {
                imageModal.style.display = "none";
                imageModal.classList.remove('fadeOut');
            }, 500);
        }
    });

    function showNotification() {
        const message = "Nome de Usuário Copiado.";
        
        notification.textContent = message;
        notification.style.display = "block";
        notification.classList.add('fadeInNotification');

        const textToCopy = "cpakuma";
        navigator.clipboard.writeText(textToCopy)
            .then(() => console.log('Texto copiado para a área de transferência: ', textToCopy))
            .catch(err => console.error('Erro ao copiar texto para a área de transferência: ', err));

        setTimeout(function() {
            notification.classList.remove('fadeInNotification');
            notification.classList.add('fadeOutNotification');
            setTimeout(() => {
                notification.style.display = "none";
                notification.classList.remove('fadeOutNotification');
            }, 300);
        }, 3000);
    }
});

let clickCount = 0;

document.querySelector('.pfp').addEventListener('click', function() {
    clickCount++;
    if (clickCount === 3) {
        showImage();
        clickCount = 0;
    }
});

let imageVisible = false;

function showImage() {
    if (!imageVisible) {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const image = document.createElement('img');
        image.src = './src/alastor.png';
        image.classList.add('corner-image');

        imageContainer.appendChild(image);
        document.body.appendChild(imageContainer);

        imageVisible = true;

        setTimeout(() => {
            imageContainer.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => {
                document.body.removeChild(imageContainer);
                imageVisible = false;
            }, 500);
        }, 2000);

        image.setAttribute('draggable', 'false');
    }
};

stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseBtn.textContent = 'Play';
    document.querySelector('.album-art img').classList.remove('rotate');
});

document.addEventListener("DOMContentLoaded", function() {
    setVolume(15);
});

const images = document.querySelectorAll('img');

images.forEach(image => {
    image.setAttribute('draggable', 'false');
});

const volumeSlider = document.querySelector('.volume-slider');
const initialValue = volumeSlider.value;

const setInitialBackground = () => {
    const percentage = (initialValue - volumeSlider.min) / (volumeSlider.max - volumeSlider.min) * 100;
    volumeSlider.style.background = `linear-gradient(to right, #EF0013 ${percentage}%, transparent ${percentage}%)`;
};

setInitialBackground();

volumeSlider.addEventListener('input', () => {
    const value = volumeSlider.value;
    const percentage = (value - volumeSlider.min) / (volumeSlider.max - volumeSlider.min) * 100;
    
    volumeSlider.style.background = `linear-gradient(to right, #EF0013 ${percentage}%, transparent ${percentage}%)`;
});
