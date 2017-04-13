/* Welcome to jukebox, an application which allows users to search for existing songs, add new songs, and play all songs in the queue.

Demonstrates knowledge of objects, loops, conditionals, and data types. */

var Song = function(title, artist, lyrics) {
  this.title = title;
  this.artist = artist;
  this.lyrics = lyrics;
  this.playSong = function() {
    console.log("Now playing: " + this.title + " by " + this.artist);
    console.log(this.lyrics);
  };
};
/* Use constructor function to create Song object. Songs have title / artist / lyrics / and playSong method that logs message to console when the called. */

var goodVibrations = new Song("Good Vibrations", "The Beach Boys", "I'm pickin' up good vibrations");
var hereComesTheSun = new Song("Here Comes The Sun", "The Beatles", "Here comes the sun and I say it's all right");
var daydreamBeliever = new Song("Daydream Believer", "The Monkees", "Cheer up, Sleepy Jean. Oh, what can it mean.");
var houndDog = new Song("Hound Dog", "Elvis Presley", "You ain't nothin' but a hound dog cryin' all the time");
var dontBeCruel = new Song("Don't Be Cruel", "Elvis Presley", "I don't want no other love, Baby it's just you I'm thinking of.");

var songs = [goodVibrations, hereComesTheSun, daydreamBeliever, houndDog, dontBeCruel];
/* Create instances of Song object; add them to songs array */

var userName = "";

var startJukebox = function() {
  userName = prompt("Welcome to the Tune Machine. Looks like you're ready to play some tunes! What's your name?");
  makeSelection();
};\
/* Create function startJukebox. A prompt greets user; collect user name; saves to variable userName. Call makeSelection function */

var makeSelection = function() {
  var userChoice = prompt("Hi " + userName + "! Would you like to (A)dd a new song, (S)earch for an existing song, (P)lay all songs in the queue, or (Q)uit?");

  userChoice = userChoice.toLowerCase();

  if (userChoice === "a") {
    addSong();
  } else if (userChoice === "s") {
    searchForSong();
  } else if (userChoice === "p") {
    playSongs();
  } else if (userChoice === "q") {
    console.log("Quitting! Goodbye!");
  } else {
    console.log("Invalid selection! Goodbye!");
  }
};
/* Create function makeSelection. Prompt user for a choice; convert input to lowercase; use input against if/else to call the correct function to control the jukebox; addSong / searchForSong / playSongs / quit. Provide invalid else message. */

var playQueue = [];
/* Create array playQueue; accessible from anywhere.*/

var addSong = function() {
  var title = prompt("What is the title of the song you'd like to add?");
  var artist = prompt("Great choice, " + userName + "! Please enter the artist.");
  var lyrics = prompt("Please enter a few lyrics.");
  var song = new Song(title, artist, lyrics);

  songs.push(song);
  playQueue.push(song);

  console.log("Great choice, " + userName + "! " + song.title + " has been added.");
};
/* Create addSong function. Collect song title / artist / lyrics using prompts. Add this song to songs array; available for other users. Add song to the playlist; add song to playQueue array; log confirmation to console. */

var searchForSong = function() {
  var query = prompt("Please enter a song or artist.");

  query = query.toLowerCase();

  var results = [];

  for (var i = 0; i < songs.length; i++) {
    var song = songs[i];

    if (song.title.toLowerCase() === query || song.artist.toLowerCase() === query) {
      results.push(song);
    }
  }

  if (results.length === 1) {
    var song = results[0];
    var addToQueue = prompt("One song was found:\n" + song.title + " by " + song.artist + ".\nWould you like to add this song to the queue? (Y)es or (N)o?");

    addToQueue = addToQueue.toLowerCase();

    if (addToQueue === 'y') {
      playQueue.push(song);
      console.log("Great choice, " + userName + "! " + song.title + " has been added.");
    }
  }
  else if (results.length > 1) {
    var printableResults = "";

    for (var i = 0; i < results.length; i++) {
      var song = results[i];

      printableResults += (i + 1) + ". " + song.title + " by " + song.artist + "\n";
    }

    var songNumber = prompt(results.length + " songs were found:\n\n" + printableResults + "\nPlease enter the number for the song you would like to add.");

    songNumber = parseInt(songNumber, 10) - 1;

    var song = results[songNumber];

    playQueue.push(song);
    console.log("Great choice, " + userName + "! " + song.title + " has been added.");
  }
  else {
    var noAddition = prompt("No songs match your query. Would you like to add a new song? (Y)es or (N)o?");
    noAddition = noAddition.toLowerCase();
    if (noAddition == "y"){
      addSong();
    }
    else {
      makeSelection();
    }
  }

  return results;
};
/* Create searchForSong function. Perform case-insensitive search against songs titles / artists. Prompt user for query; convert query to lowercase string.
Create results array to store results of search. Loop through songs array; check title / artist for the current song matches the query. If match; push the song to results array.

If ONE result - Prompt user to add song to the playlist; convert answer to a lowercase string. If ("y"), add result to playQueue array; log confirmation to console.

If MULTIPLE results - Declare printableResults string. For each result, add summary to printableResults; prompt user to select song; convert the response to number using parseInt() function; subtract one so number is same as index for song in results array; zero-based.
Add song to playQueue array; log confirmation to console.

If NO results - Prompt user to add a new song; convert response to lowercase string. If response ("y") call the addSong function; else call the makeSelection function. 

Return the results array from the function. */

var playSongs = function() {
  for (var i = 0; i < playQueue.length; i++) {
    var song = playQueue[i];
    song.playSong(); 
  }
};
/* Create function playSongs. Loop through all songs in playQueue, calling playSong() method on each song. */

startJukebox();
/* Call the startJukebox function */

/* Give it a whirl! */