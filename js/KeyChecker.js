const keyChecker = document.querySelector("#key_submitter");
const keyField = document.getElementById('key_check');
var answer = 0;

// Hashing function shamelessly stolen from some guy on StackOverflow lol
const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

keyChecker.addEventListener("click", function() {
    var val = keyField.value;
    
    // Uncomment for debugging purposes only
    console.log(val, cyrb53(val));
    console.log(answer);
    if (cyrb53(val) === answer) {
        sendSolutionToBackend(val);
        rightAnswerFlash();
    } else {
        wrongAnswerFlash();
    }
});

function rightAnswerFlash() {
    keyField.style.transition = "none";
    keyField.style.backgroundColor = 'green';
    setTimeout(() => {
        keyField.style.transition = "background-color 500ms linear"; 
        keyField.style.backgroundColor = 'rgb(26, 39, 59)';
    }, 100);
}

function wrongAnswerFlash() {
    keyField.style.transition = "none";
    keyField.style.backgroundColor = 'red';
    setTimeout(() => {
        keyField.style.transition = "background-color 500ms linear"; 
        keyField.style.backgroundColor = 'rgb(26, 39, 59)';
    }, 100);
}

var form=document.getElementById("key_form");
function submitForm(event) {
   //Preventing page refresh
   event.preventDefault();
}
form.addEventListener('submit', submitForm);

document.getElementById('key_check').addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        var val = keyField.value;
    
        // Uncomment for debugging purposes only
        console.log(val, cyrb53(val));
        if (cyrb53(val) === answer) {
            sendSolutionToBackend(val);
            rightAnswerFlash();
        } else {
            wrongAnswerFlash();
        }
    }
});

function clearText() {
    document.getElementById('key_check').value = "";
}