
var sqrArray =['one', 'two', 'three', 'four']; 

var sound_1 = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
var sound_2 = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
var sound_3 = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
var sound_4 = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';

var game = {
        has_power: false,
        count: 0,
        sequence: [],
        is_strict: false,
        reset: function() {
          this.count = 0;
          this.sequence = [];
        }
}

// get random array element
function random_sqr() {
  return sqrArray[Math.floor(Math.random() * 4)];
} 

// adds and remove green background
function makelight(n) {
  $('#' + n).addClass('light');
  playSound(n);
  setTimeout(function() {
    $('#' + n).removeClass('light');
  }, 1000);
}

// assignes makelight() in order of array elements
function play_ev() {
  $('#screen').html(game.count);
  var i = 0;
  var sequenceInter = setInterval(function() {
    makelight(game.sequence[i]);
    i++;
    if(i>=game.sequence.length) {
      clearInterval(sequenceInter);
      $('.sqr').css('pointer-events', 'auto');
    }
    
  }, 2000);
}

// adds random sqr to game
function addToSequence() {
  game.sequence.push(random_sqr());
}

function play_game() {
  game.count++;
  
  game.sequence.push(random_sqr());
  play_ev();
}
var checkCount = 0;
//player picks sqr
function player_pick() {
  $('.sqr').css('pointer-events', 'none');
  checkCount = 0;
  play_game();
}

// Checks player choice
//function check_move() {
  $('.sqr').click(function() {
    playSound(this.id);
    if(this.id === game.sequence[checkCount]) {
      console.log('Correct!');
      checkCount++;
      if(checkCount === game.sequence.length) {
        if(checkCount === 20) {
          console.log('game over');
          $('#screen').html('**');
          setTimeout(function(){
            game.reset();
            player_pick();
          })
        }  else {
        console.log('end of round');
        player_pick();
        }
      }
      //the player's choice is incorrect
    } else if(this.id !== game.sequence[checkCount]) {
      console.log('incorrect');
      $('.sqr').css('pointer-events', 'none');
      console.log('no clicking!');
      $('#screen').html('!!');
      checkCount = 0;
      setTimeout(function(){
        if(game.is_strict) {
        game.reset();
        player_pick();
      } else {
        play_ev();
      }
      }, 2000)
    }
  })

//Pwer button turns on/off game
$('.power').click(function() {
  if(!game.has_power) {
    $('#screen').html('--');
    game.has_power = true;
    
  } else {
    $('#screen').html('');
    game.has_power = false;
    game.reset();
   
  }
})

// strict mode resets to level 1 on mismatch player input
$('.strict').click(function() {
   if(game.is_strict) {
    game.is_strict = false;
    $('.btn.strict').css({'border':'', 'width':'30px', 'height':'30px'});
  } else {
    game.is_strict = true;
    $('.btn.strict').css({'border':'3px solid rgba(41, 128, 185, .2)', 'width':'24px', 'height':'24px'});
  }
})

//Start button begins a game
 $('.start').click(function(){
        if(game.has_power) {
        player_pick();
        }
    })

 function playSound(tile) {
        console.log('sound');
        var snd;
        switch(tile) {
          case 'one':
            snd = new Audio(sound_1);
          break;
          case 'two':
            snd = new Audio(sound_2);
            break;
          case 'three':
            snd = new Audio(sound_3);
          break;
          case 'four':
            snd = new Audio(sound_4);
          break;
        }
        snd.play();
    }