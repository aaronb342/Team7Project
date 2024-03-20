function updateText() {
    // Get the input elements
    const puzzleElement = document.getElementById('puzzleText');
    const puzzleText = puzzleElement.textContent;
    const keyElement = document.getElementById('key');
    const outputElement = document.getElementById('output');

    // Get key
    //const text = userInput.value;
    const key = parseInt(keyElement.value);
    
    // Validate that key is a number
    if (isNaN(key)) {
      alert("Please enter a valid number for key value!");
      return;
    }
    
    // Encode the text using Caesar Cipher for now
   
    const encodedText = caesarCipher(puzzleText, key);

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
