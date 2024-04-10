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
    let keySet = key.split(",");
    let partialDecode = caesarCipher(puzzleText,keySet[0]);
    encodedText = vigenereCipher(partialDecode,keySet[1]);
   }
    output.innerHTML = "";
    
    // Update the text content
    printLetterByLetter("output", encodedText, 100);
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
 
