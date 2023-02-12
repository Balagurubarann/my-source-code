// Music Logic

document.addEventListener('DOMContentLoaded', () => {
    const musicContainer = document.querySelector('.music-container');
    const songTitle = document.querySelector('.song-title');
    const progress = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-container');
    const prevBtn = document.querySelector('.prevBtn');
    const nextBtn = document.querySelector('.nextBtn');
    const playBtn = document.querySelector('.playBtn');
    const audio = document.querySelector('.audio');
    const shuffleBtn = document.querySelector('.shuffleBtn');
    const repeatBtn = document.querySelector('.repeatBtn');

    const songs = ['bad guy', 'Go Fuck Yourself', 'On my way', 'Lovely', 'The Box'];
    const copySongs = songs;
    let songIndex = Math.floor(Math.random() * songs.length);

    loadSong(songs[songIndex]);

    function loadSong(song) {
        songTitle.innerText = song;
        audio.src = `music/${song}.mp3`;
    }

    function playSong() {
        musicContainer.classList.add('play');
        playBtn.querySelector('i.fas').classList.remove('fa-play');
        playBtn.querySelector('i.fas').classList.add('fa-pause');

        audio.play();
    }

    function pauseSong() {
        musicContainer.classList.remove('play');
        playBtn.querySelector('i.fas').classList.add('fa-play');
        playBtn.querySelector('i.fas').classList.remove('fa-pause');

        audio.pause();
    }

    function nextSong() {
        songIndex++;

        if (songIndex > songs.length - 1) {
            songIndex = 0;
        }

        loadSong(songs[songIndex]);
        playSong();
    }

    function prevSong() {
        songIndex--;

        if (songIndex < 0) {
            songIndex = songs.length - 1;
        }

        loadSong(songs[songIndex]);
        playSong();
    }

    function updateProgress(e) {
        const {currentTime, duration} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    } 

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width ) * duration;
    }

    function shuffleOn() {
        shuffleBtn.classList.add('shuffle');
        songs.sort(() => Math.random() - 0.5);
        console.log(songs);
    }

    function shuffleOff() {
        shuffleBtn.classList.remove('shuffle');
        songs = [].concat(copySongs);
        console.log(songs);
    }

    function shuffleSong() {
        const isShuffled = shuffleBtn.classList.contains('shuffle');

        if (isShuffled) {
            shuffleOff();
        } else {
            shuffleOn();
        }
    }

    function repeatOn() {
        repeatBtn.classList.add('repeat');
    }

    function repeatOff() {
        repeatBtn.classList.remove('repeat');
    }

    playBtn.addEventListener('click', () => {

        const isPlaying = musicContainer.classList.contains('play');

        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);

    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    audio.addEventListener('ended', nextSong);
    shuffleBtn.addEventListener('click', shuffleSong);
    repeatBtn.addEventListener('click', () => {

        const isRepeating  = repeatBtn.classList.contains('.repeat');

        if (isRepeating) {
            console.log('repeat-off');
            repeatOff();
        } else {
            console.log('repeat-on');
            repeatOn();
        }
    });
});