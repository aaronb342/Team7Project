//console.log(vigenereCipher("Uspxvtlynrxbgru, rgy tvtuogu mzi cell eztawv! Xaw pvbm twqdew kj mzi cell qei!","secret"));
//console.log(caesarCipher("Uspxvtlynrxbgru, rgy tvtuogu mzi cell eztawv! Xaw pvbm twqdew kj mzi cell qei!",25));
//console.log(caesarCipher("Trowuskxmqwafqt, qfx sustnft lyh bdkk dyszvu! Wzv oual svpcdv ji lyh bdkk pdh!",1));
let attempts = 0;
//console.log(caesarCipher("Uspxvtlynrxbgru! Psn uvctoxv xjv jbfen gysrpg! Klbk twqdew acj jbjwv vrvjcrkiw omvy e Oakgeikw Gkglxj, xjvr mzev tmizitkiql acj iguvagxxv akkl t Uegjek Umryik.",25));
function updateText() {
  // Get the input elements
  const puzzleElement = document.getElementById('puzzleText');
  const puzzleText = puzzleElement.textContent;
  const keyElement = document.getElementById('key');
  const outputElement = document.getElementById('output');
  const cipher = document.getElementById('ciphers');
  let selectedcipher = cipher.value;
  let key;
  
  // Get key
  //const text = userInput.value;


  // Validate that key is a number

  let encodedText = "";

 if(selectedcipher == 'caesar'){
    key = parseInt(keyElement.value);
    if (isNaN(key)) {
    document.getElementById("errorSound").play();
    alert("Please enter a valid number for key value!");
    return;
    }
    encodedText = caesarCipher(puzzleText, key);
 }
 else if(selectedcipher == 'rot13'){
  encodedText = caesarCipher(puzzleText, 13);
 }
 else if(selectedcipher == 'vigenere'){
  key = keyElement.value;
  encodedText = vigenereCipher(puzzleText,key);
 }
 else if(selectedcipher == 'secret'){
  key = keyElement.value;
  const regex = /^(\d+),([a-zA-Z]+)$/;
  if(!regex.test(key)){
    document.getElementById("errorSound").play();
    alert("Please enter valid key format!");
    return;
  }
  let keySet = key.split(",");

  let partialDecode = caesarCipher(puzzleText,parseInt(keySet[0]));
  alert(partialDecode);
  encodedText = vigenereCipher(partialDecode,keySet[1]);
 }
  output.innerHTML = "";

  // Update the text content
  printLetterByLetter("output", encodedText, 50);

}

function checkCorrect(){
    const cipher = document.getElementById('ciphers');
    let selectedcipher = cipher.value;
    const page = document.getElementById('identifier');
    const keyElement = document.getElementById('key');
    let key;

    let encodedText = "";
    //alert("checking");
    if(selectedcipher == 'caesar'){
      //alert("checking caesar");
        key = parseInt(keyElement.value);
        if (isNaN(key)) {
            document.getElementById("errorSound").play();
            alert("Please enter a valid number for key value!");
            return;
        }
        encodedText = caesarCipher(puzzleText, key);
    }
    else if(selectedcipher == 'rot13'){
        encodedText = caesarCipher(puzzleText, 13);
    }
    else if(selectedcipher == 'vigenere'){
        key = keyElement.value;
        encodedText = vigenereCipher(puzzleText,key);
    }
    else if(selectedcipher == 'secret'){
        key = keyElement.value;
        const regex = /^(\d+),([a-zA-Z]+)$/;
        if(!regex.test(key)){
            document.getElementById("errorSound").play();
            alert("Please enter valid key format!");
            return;
        }
        let keySet = key.split(",");
        let partialDecode = caesarCipher(puzzleText,parseInt(keySet[0]));
        alert(partialDecode);
        encodedText = vigenereCipher(partialDecode,keySet[1]);
    }

    
        if((page.textContent == "Puzzle 1") && (selectedcipher == 'rot13')){
        generateConfetti();
    }
    else if((page.textContent == "Puzzle 2") && (selectedcipher == 'caesar') && (key == '21')){
    generateConfetti();
    }
    else if((page.textContent == "Puzzle 3") && (selectedcipher == 'vigenere') && (key == 'code')){
        generateConfetti();
        }
           else if((page.textContent == "Puzzle 4") && (selectedcipher == 'secret') && (key == '1,secret')){
        generateConfetti();
      }
      else if((page.textContent == "Final Puzzle") && (selectedcipher == 'secret') && (key == '1,ring')){
          burstConfetti();
        }
                                                                                          
    else{
      attempts++;
      // alert(attempts);
      if(attempts >= 20){
        if(page.textContent == "Puzzle 1"){
          alert("Cipher:ROT13")
        }
        else if(page.textContent =="Puzzle 2"){
          alert("Cipher:caesar key:21");
        }
        else if(page.textContent == "Puzzle 3"){
          alert("cipher:vigenere key:code");
        }
      }

    } 
}

function printLetterByLetter(destination, message, speed){
  var i = 0;
  var interval = setInterval(function(){
      document.getElementById(destination).innerHTML += message.charAt(i);
      i++;
      if (i > message.length){
          clearInterval(interval);
      }
  }, speed);
}


function caesarCipher(text, key) {
    let encoded = "";
  for (let i = 0; i < text.length; i++) {
    let char = text.charAt(i);
    
    // Check for uppercase and lowercase letters
    if (char.match(/[a-z]/i)) {
      let code = char.charCodeAt(0);
      
      // Account for case
      if (code >= 65 && code <= 90) {
        code = ((code - 65 + key) % 26) + 65;
      } else { 
        code = ((code - 97 + key) % 26) + 97;
      }
      
      encoded += String.fromCharCode(code);
    } else {
      encoded += char; // Keep non-alphabetic characters unchanged
    }
  }
  return encoded;
}

//tests to make sure that symbols and numbers are not shifted
function isLetter (str) {
return str.length === 1 && str.match(/[a-zA-Z]/i)
}

//tests letter for case so shift can be adjusted accordingly
function isUpperCase (character) {
if (character === character.toUpperCase()) {
  return true
}
if (character === character.toLowerCase()) {
  return false
}
}

function vigenereCipher (message, key) {
console.log(key);
let result = '';

for (let i = 0, j = 0; i < message.length; i++) {
  const c = message.charAt(i); //test each char (i), increments to next char in message each run
  if (isLetter(c)) { //prevents other chars and numbers from being modified
    
    //shifts current char correct number of spaces for current key char, starts at ascii code 90 for uppercase, 122 for lowercase.
    if (isUpperCase(c)) {
      result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26); //key char changed to uppercase if messagechar is uppercase
    } else {
      result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26); //key char changed to lowercase if messagechar is lowercase
    }
    
  }
  //does not do anything to numbers and symbols, just adds them to the result string
  else {
    result += c;
  }
  //increment to next char in key before next message char is processed
  j = ++j % key.length;
}
return result;
}
function encrypt (message, key) {
let result = ''

for (let i = 0, j = 0; i < message.length; i++) {
  const c = message.charAt(i)
  if (isLetter(c)) {
    if (isUpperCase(c)) {
      result += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26 + 65) // A: 65
    } else {
      result += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26 + 97) // a: 97
    }
    
  } else {
    result += c
  }
  j = ++j % key.length;
}
return result
}

function generateConfetti() {
  document.getElementById("confettiSound").play();
  const container = document.getElementById('confetti-container');

  for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = randomColor();
      confetti.style.left = Math.random() * container.offsetWidth + 'px';
      confetti.style.animationDelay = Math.random() * 3 + 's';
      container.appendChild(confetti);
  }
}

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function burstConfetti() {
    document.getElementById("confettiSound").play();
    const confettiContainer = document.getElementById('confetti-container');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Create 100 confetti particles
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti2'
        confetti.style.backgroundColor = randomColor();
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confettiContainer.appendChild(confetti);
        const angle = Math.random() * Math.PI * 2; // Random angle in radians
        const distance = Math.random() * 1000; // Maximum distance from center
        const posX = centerX + Math.cos(angle) * distance;
        const posY = centerY + Math.sin(angle) * distance;
        confetti.style.left = posX + 'px';
        confetti.style.top = posY + 'px';
        confetti.style.animation = `fanOut 3s ease forwards`;
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });

        // Remove confetti after animation completes
    }
}
