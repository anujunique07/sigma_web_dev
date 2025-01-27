console.log('Lets write javascript')
let currentSong = new Audio();
let songs;
let currFolder;

function secondsToMinutesSeconds(seconds) {
   if(isNaN(seconds) || seconds < 0){
        return "00:00";
   }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinites = String(minutes).padStart(2, '0');
  const formattedseconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinites}:${formattedseconds}`;


}


async function getSongs(folder) {
currFolder = folder;
let a= await fetch(`http://192.168.29.50:5500/${folder}/`)
let response= await a.text();
console.log(response)
let div = document.createElement("div")
div.innerHTML = response;
let as = div.getElementsByTagName("a")
songs= []

for (let index = 0; index < as.length; index++) {
    const element = as[index];
    
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/songs/`)[1])
        }
}

//show all the songs in the playlist

let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
songUL.innerHTML =  ""
for(const song of songs){
   songUL.innerHTML = songUL.innerHTML + `<li>
   <img class="invert" src="music.svg" alt="">
   <div class="info">
        <div> ${song.replaceAll("%20", " ")}</div>
        <div>Anujit</div>
</div>
   <div class="playnow">
       <span>Play Now</span>
     <img class="invert" src="play.svg" alt="">
   </div>
  </li>`; 
}
       
//Attack an event listner to each song

Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
e.addEventListener("click",Element=>{
console.log(e.querySelector(".info").firstElementChild.innerHTML)
playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
})
})
 return songs
}


const playMusic = (track, pause=false)=>{
    //  let audio = new Audio("/songs/" + track)
    currentSong.src = `/${currFolder}/` + track
    if(!pause){
    currentSong.play()
    play.src = "pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML = "00.00 / 00.00"
}


async function main(){

    
    // get the list of first song
   songs = await getSongs("songs/ncs")
    playMusic(songs[0],true)

      

// Attach an Event listener  to play , next and previous
  play.addEventListener("click", ()=>{
    if(currentSong.paused){
      currentSong.play()
      play.src = "pause.svg"
    }
    else{
      currentSong.pause()
      play.src = "play.svg"
    }
  })

  //listen for time update event
  currentSong.addEventListener("timeupdate", ()=>{
     console.log(currentSong.currentTime, currentSong.duration);
     document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`
     document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration)* 100 + "%"
  })

//add an event listener to seekbar
document.querySelector(".seekbar").addEventListener("click", e=>{
  let percent =(e.offsetX/e.target.getBoundingClientRect().width)*100;
document.querySelector(".circle").style.left = + "%";
currentSong.currentTime = ((currentSong.duration)* percent)/100
}) 
  
//Add an event listner for hamburger
    document.querySelector(".hamburger").addEventListener("click", ()=>{
         document.querySelector(".left").style.left = "0"
    })

// Add an event listner for close button
document.querySelector(".close").addEventListener("click", ()=>{
  document.querySelector(".left").style.left = "-120%"

})
// Add event listner to previous 
previous.addEventListener("click", ()=>{
  currentSong.pause()
  console.log("previous clicked")
  console.log(currentSong)
  let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
     if((index-1) >= 0){
     playMusic(songs[index-1])
     }

})

//add an event listener to next
next.addEventListener("click", ()=>{
  currentSong.pause()
  console.log("next clicked")

     let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])

     console.log(songs, index)
     if((index+1) < songs.length - 1){
     playMusic(songs[index+1])
     }

})
 //Add an event to volumn
 document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",
 (e)=>{
     console.log("setting volumn to", e.target.value, "/ 100")
     currentSong.volume = parseInt(e.target.value)/100
 })

// Load th e playlist whenever card is clicked
Array.from(document.getElementsByClassName(".card")).forEach(e=>{
  e.addEventListener("click", async item=>{
    console.log(item. item.currentTarget.dataset)
    songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
  })
})

}

main()

