let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let movie = document.querySelector('#movie');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let sing = document.querySelector('#sing');

let timer;
let autoplay = 0;
let index_no = 0;
let Playing_song = false;

let track = document.createElement('audio');

let All_song = [
    {
        name : "FAN",
        movie : "FAN",
        img : "media/img/001_fan.jpg",
        path : "media/songs/001_fansong.mp3"
    },

    {
        name : "Shape of You",
        movie : "",
        img : "media/img/002_shapeofyou.jpg",
        path : "media/songs/002_shapeofyou.mp3"
    },

    {
        name : "ghundroo",
        movie : "WAR",
        img : "media/img/003_gu.jpg",
        path : "media/songs/003_gu.mp3"
    },

    {
        name : "Naina Da Kya Kasoor",
        movie : "Andhadhun",
        img : "media/img/004_ku.jpg",
        path : "media/songs/004_ka.mp3"
    },

    {
        name : "darshana",
        movie : "Hridayam",
        img : "media/img/005_dr.jpg",
        path : "media/songs/005_hr.mp3"
    },
];


function load_track(index_no){
    clearInterval(timer);
    reset_slider();
    title.innerHTML = All_song[index_no].name;
    movie.innerHTML = All_song[index_no].movie;
    track_image.src = All_song[index_no].img;
    track.src = All_song[index_no].path;
    track.load();
    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1; 
    timer = setInterval(range_slider, 1000);
}

load_track(index_no);

function justPlay(){
    if(Playing_song==false){
        playsong();
    }else{
        pausesong();
    }
}


function playsong(){
    track.play();
    Playing_song = true;
    sing.src = "media/pause_player.png";
}

function pausesong(){
    track.pause();
    Playing_song = false;
    sing.src = "media/play_player.png";
}

if(track.ended){
    sing.src = "media/play_player.png";
    if(autoplay == 1){
        index_no += 1;
        load_track(index_no);
        playsong();
    } 
}

function next_song(){
    if(index_no < All_song.length - 1){
        index_no += 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

function previous_song(){
    if(index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = All_song.length - 1;
        load_track(index_no);
        playsong();
    }
}

function mute_sound(){
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}

function duration_slider(){
    slider_position = track.duration * (slider.value/100);
    track.currentTime = slider_position;
}

function range_slider(){
    let position = 0;
    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration);
        slider.value = position;
    }
}


function reset_slider(){
    slider.value = 0;
}

function autoplay_switch(){
    if(autoplay == 1){
        autoplay = 0;
        auto_play.style.background = "rgba(255, 255, 255, 0.2)";
    }else{
        autoplay = 1;
        auto_play.style.background = "#997950";
    }
}
