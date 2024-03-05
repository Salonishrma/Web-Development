let score =JSON.parse(localStorage.getItem('score')) ||{
    win: 0,
    lose: 0,
    tie: 0
 };
   updateScoreElement();

   let isAutoplay= false;
   let intervalId;

   /*const autoplay=() =>{
   };*/
   function autoPlay(){
    if(!isAutoplay){
        intervalId =setInterval(()=>{
            const playerMove=pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoplay=true;
    }
    else{
        clearInterval(intervalId);
        isAutoplay=false;
    }
   }
   document.querySelector('.js-rock-button')
    .addEventListener('click',()=>{
        playGame('rock');
    });
    document.querySelector('.js-paper-button')
    .addEventListener('click',()=>{
        playGame('paper');
    });
    document.querySelector('.js-scissors-button')
    .addEventListener('click',()=>{
        playGame('scissors');
    });
 // for keyboard
   document.body.addEventListener('keydown', (event) =>{
    if(event.key ==='r'){
        playGame('rock');
    }
    else if(event.key ==='p'){
        playGame('paper');
    }
    else if(event.key ==='s'){
        playGame('scissors');
    }
   });

   function playGame(playerMove) {
     const computerMove = pickComputerMove();

     let result = '';

     if (playerMove === 'scissors') {
       if (computerMove === 'rock') {
         result = 'You lose.';
       } else if (computerMove === 'paper') {
         result = 'You win.';
       } else if (computerMove === 'scissors') {
         result = 'tie.';
       }

     } 
     else if (playerMove === 'paper') {
       if (computerMove === 'rock') {
         result = 'You win.';
       } else if (computerMove === 'paper') {
         result = 'tie.';
       } else if (computerMove === 'scissors') {
         result = 'You lose.';
       }
       
     } 
     else if (playerMove === 'rock') {
       if (computerMove === 'rock') {
         result = 'tie.';
       } else if (computerMove === 'paper') {
         result = 'You lose.';
       } else if (computerMove === 'scissors') {
         result = 'You win.';
       }
     }

     if(result==='You win.'){
        score.win+=1;
     }
     else if(result==='You lose.'){
         score.lose+=1;
     }
     else if(result==='tie.'){
         score.tie+=1;
     }

     localStorage.setItem('score', JSON.stringify(score));
     updateScoreElement();
     document.querySelector('.js-result').innerHTML=result;
     document.querySelector('.js-moves').innerHTML=`You
     <img src="images/${playerMove}.jpg" class="move-icon">
     <img src="images/${computerMove}.jpg" class="move-icon">
 Computer`;
   }
   function updateScoreElement(){
     document.querySelector('.js-score').innerHTML=`win :${score.win}, lose: ${score.lose}, tie: ${score.tie}`;
   }
   function pickComputerMove() {
     const randomNumber = Math.random();

     let computerMove = '';

     if (randomNumber >= 0 && randomNumber < 1 / 3) {
       computerMove = 'rock';
     } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
       computerMove = 'paper';
     } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
       computerMove = 'scissors';
     }

     return computerMove;
   }