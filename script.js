

   function timeToString(time) {
    let diffInHours = time/3600000;
    let hh = Math.floor(diffInHours);

    let diffInMin = (diffInHours - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);
  
    let formattedHH = hh.toString().padStart(2, "0")
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
    return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
    
}

const playButton = document.getElementById('playBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');

   
let startTime;
let elapsedTime = 0;
let timerInterval;

function print(txt) {
    document.getElementById("display").innerHTML = txt;
  }
  
  function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      print(timeToString(elapsedTime));
    }, 10);
    showButton('pause')
  }

  function pause(){
    clearInterval(timerInterval)
    showButton('play')
  }

  function reset(){
    clearInterval(timerInterval)
    print('00:00:00')
    elapsedTime = 0
    showButton('play')
  }


function showButton(buttonKey) {
  const buttonToShow = buttonKey === 'play' ? playBtn : pauseBtn;
  const buttonToHide = buttonKey === 'play' ? pauseBtn : playBtn;
  buttonToShow.style.display = 'block'
  buttonToHide.style.display = 'none'
}


  //clicking func
playButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);

let clock = document.querySelector('#clock');


fetch('http://worldclockapi.com/api/json/Gmt/now')
.then((res) =>{
  return res.json()
})
.then((data) =>{
 //console.log(data.currentDateTime)
 let time = data.currentDateTime;
 console.log(time)
  return clock.map(function(time) {
    let h2 = document.createElement('h2')
    h2.innerHTML = time;
    clock.append(h2)
  })
})
.catch((error) => {
  console.log(error);
})
