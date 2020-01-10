/********** TODO ***********/ /*
- upload to gitHub
-record video
-post on dribbble and instagram

 */

var song = new Audio();
var currentSong = 0; //points to the current song

var songInfo = {
    file: [
            "assets/songs/02 Everybody Wants to Be Famous.mp3",
            "assets/songs/Scott_Holmes_-_05_-_Little_Idea.mp3",
            "assets/songs/AToutALHeure.mp3",
        ],
    title: [
            "Everybody Wants To Be Famous",
            "Little Idea",
            "À tout à l'heure"
        ],
    artist: [
            "Superorganism",
            "Scott Holmes",
            "Biblio"
        ],
    art: [
            "assets/artwork/Superorganism.jpg",
            "assets/artwork/musicplayer_albumartwork-example.png",
            "assets/artwork/SilverWilkinson.jpg"
        ]
};

var playlist = new Array ();
playlist[0] = new Array (songInfo.file[0],songInfo.title[0],songInfo.artist[0],songInfo.art[0])
playlist[1] = new Array (songInfo.file[1],songInfo.title[1],songInfo.artist[1],songInfo.art[1])
playlist[2] = new Array (songInfo.file[2],songInfo.title[2],songInfo.artist[2],songInfo.art[2])


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

var arr = shuffle(playlist);

var ui = {
    title: document.getElementById("songTitle"),
    artist: document.getElementById("artistName"),
    art: document.getElementById("albumArtwork"),
    songProgress: document.getElementById("trackProgress"),
    playIcon: document.getElementById('playButton'),
    detailShadow: document.getElementById('detailsBackground'),
    volumeBackground: document.getElementById('volumeBackground'),
    volumeSlider: document.getElementById('slider')
}


function truncateTitle(input) {
    if (input.length > 22)
       return input.substring(0,22) + '...';
    else
       return input;
};

function truncateArtist(input) {
    if (input.length > 30)
       return input.substring(0,30) + '...';
    else
       return input;
};




function playPause() {
    if (song.currentTime === 0) {
        song.src = playlist[currentSong][0];
        ui.title.textContent = truncateTitle(playlist[currentSong][1]);
        ui.artist.textContent = truncateArtist(playlist[currentSong][2]);
        ui.art.src = playlist[currentSong][3];
        ui.playIcon.setAttribute("class", "fas fa-pause");
        detailAnimation();
        detailsShadow();
        song.play();
        
    } else if (song.paused === true) {
        song.play(song.currentTime);
        ui.playIcon.setAttribute("class", "fas fa-pause");

    } else if (song.currentTime > 0 && song.paused === false){
        song.pause();
        ui.playIcon.setAttribute("class", "fas fa-play");
    }
};



function next() {
    if (currentSong < (playlist[currentSong].length-2)){
        currentSong = currentSong + 1
    } else {
        currentSong = 0
    };
    song.src = playlist[currentSong][0];
    ui.title.textContent = truncateTitle(playlist[currentSong][1]);
    ui.artist.textContent = truncateArtist(playlist[currentSong][2]);
    ui.art.src = playlist[currentSong][3];
    ui.playIcon.setAttribute("class", "fas fa-pause");
    song.play();

}

function previous() {
    if (currentSong === 0){
        currentSong = (playlist[currentSong].length-2);
    } else {
        currentSong = currentSong - 1
    }
    song.src = playlist[currentSong][0];
    ui.title.textContent = truncateTitle(playlist[currentSong][1]);
    ui.artist.textContent = truncateArtist(playlist[currentSong][2]);
    ui.art.src = playlist[currentSong][3];
    ui.playIcon.setAttribute("class", "fas fa-pause");
    song.play();

}


song.addEventListener('timeupdate',function (){
    var percentage = (song.currentTime/song.duration)*100;
    ui.songProgress.value = percentage;
});

function detailAnimation(){
    gsap.to("#detailsInfo", {y: -100, duration: 1}); //animates details element upwards
    gsap.to("#detailsBackground", {y: -100, duration: 1});
}

function volumeOpenAnimation(){
    gsap.to("#volumeInfo", {y: 80, duration: 0.5}); //animates details element upwards
    gsap.to("#volumeBackground", {y: 80, duration: 0.5});
}

function volumeCloseAnimation(){
    gsap.to("#volumeInfo", {y: 0, duration: 0.5}); //animates details element upwards
    gsap.to("#volumeBackground", {y: 0, duration: 0.5});
}

function detailsShadow(){
    ui.detailShadow.style["animation"] = "detailsShadowAnimation .5s ease-in 0s forwards";
}

function volumeShadow(){
    ui.volumeBackground.style["animation"] = "volumeShadowAnimation .5s ease-in 0s forwards";
}

function volumeShadowAnimationReverse(){
    ui.volumeBackground.style["animation"] = "volumeShadowAnimationReverse .5s ease-in 0s forwards";
}

var volumeVisible = false;

function volumePanelTrigger() {
    if (volumeVisible === false){
        volumeShadow();
        volumeOpenAnimation();
        volumeVisible = true;
    } else {
        volumeShadowAnimationReverse();
        volumeCloseAnimation();
        volumeVisible = false;
    }
}

document.getElementById("slider").oninput = function() {
    this.style.background = 'linear-gradient(to right, #e91f62 0%, #e91f62 ' + this.value + '%, #C5D5E7 ' + this.value + '%, #C5D5E7 100%)'
  };



function SetVolume(val) {
    song.volume = val / 100;
}

song.addEventListener('ended',function(){
    next();
  });
