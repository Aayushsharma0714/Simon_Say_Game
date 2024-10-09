let gameseq=[];
let userseq=[];
let btns=["yellow","red","green","purple"];
let start=false;
let level=0;
let score =0;
let h2=document.querySelector("h2");
let scoreDisplay = document.getElementById('score');

document.addEventListener("keypress",function(){
   if(start==false){
    console.log("game started");
    start=true;
    document.querySelector("body").style.backgroundImage = "url('bg.jpg')"; 
    levelUp();
    }
});

function gameFlash(btn){
btn.classList.add("flash");
setTimeout(function(){
    btn.classList.remove("flash");
}, 150);
}

function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    score = level- 1;
    scoreDisplay.textContent = score;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    gameFlash(randBtn);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 150);
    }
   function checkAns(idx){
  if(gameseq[idx]==userseq[idx]){
    if(gameseq.length==userseq.length){
        setTimeout(levelUp,1000);
    }
  }
  else{
    sounds.gameOver.play();
    h2.innerHTML=`Game Over! <b>Your score was ${level}.<b> <br>Press any key to Restart`;
    document.querySelector("body").style.backgroundImage = "none"; 
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    },150);
    reset();
  }
   } 

function btnPress(){
     let  btn=this;
     userFlash(btn);    
     let userColor=btn.getAttribute("id");
     userseq.push(userColor);
     checkAns(userseq.length-1);
    }
let allBtns=document.querySelectorAll(".btn")
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    start=false;
    gameseq=[];
    userseq=[];
    level = 0;
    score = 0;
    scoreDisplay.textContent = score;
   
}
const sounds = {
    red: new Audio('mixkit-on-or-off-light-switch-tap-2585.wav'),
    yellow: new Audio('mixkit-hard-typewriter-click-1119.wav'),
    green: new Audio('mixkit-game-click-1114.wav'),
    purple: new Audio('mixkit-interface-device-click-2577.wav'),
    gameOver: new Audio('mixkit-player-losing-or-failing-2042.wav')
};

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        sounds[button.id].play();
    });
});
