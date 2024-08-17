const descriptionText = document.querySelector("#description_text_segment_1");
const descriptionText2 = document.querySelector("#description_text_segment_2");
const titleText = document.querySelector("#challenge_title");

const dlButton = document.querySelector("#dl_button");
const dlTxt = document.querySelector("#dl_txt_id");

const imperfectPast = document.querySelector("#imperfect_past");
const paranoid = document.querySelector("#where_are_we_going");
const powerCube = document.querySelector("#power_cube");
const loseItAll = document.querySelector("#what_can_we_lose");
const theoremsAndDreams = document.querySelector("#theorems_and_dreams");
const connections = document.querySelector("#connections");
const imLost = document.querySelector("#im_lost");
const theyKnewMyName = document.querySelector("#they_knew_my_name");
const behindTheCurtain = document.querySelector("#behind_the_curtain");
const putMeBackTogether = document.querySelector("#put_me_back_together");

dlButton.style.display = "none";

function sendSolutionToBackend(solution) {
    var xhr = new XMLHttpRequest();
    //console.log("posting");
    xhr.onprogress = function() {
        return;
    };
    let link = "http://192.168.1.167:8080/" + solution + "/";
    //console.log("Posting to: " + link);
    
    xhr.open("POST", link, true);
    //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();
}

imperfectPast.addEventListener("click", function() {
    getSolutionStatuses();
    titleText.textContent = "Imperfect Past";
    descriptionText.textContent = "We are constantly changing, constantly improving, making missteps. From our roots are where we sprout.";
    descriptionText2.textContent = "(Hint: What does the URL of this site tell you?)";
    
    dlButton.style.display = "none";
    answer = imperfectPastKey;
    clearText();
    getSolutionStatuses();
});
paranoid.addEventListener("click", function() { // This is the cipher one
    titleText.textContent = "Paranoid";
    descriptionText.textContent = "They could find out the secret, they have everything they'd need.";
    descriptionText2.textContent = "I'm not ready for them to know.";

    dlButton.style.display = "flex";
    dlButton.href = "./ItDiesWithMe.zip";
    document.getElementById("dl_button_img").src="./images/ZipIcon.png";
    dlTxt.textContent = "ItDiesWithMe.zip";
    answer = paranoidKey;
    clearText();
    getSolutionStatuses();
});
powerCube.addEventListener("click", function() {
    titleText.textContent = "The Power to Make It Right";
    descriptionText.textContent = "Power...?";
    descriptionText2.textContent = "";
    dlButton.style.display = "flex";
    dlButton.href = "./PowerCube.zip";
    document.getElementById("dl_button_img").src="./images/ZipIcon.png";
    dlTxt.textContent = "PowerCube.zip";
    answer = powerCubeKey;
    clearText();
    getSolutionStatuses();
});
loseItAll.addEventListener("click", function() {
    titleText.textContent = "BREAK ME";
    descriptionText.textContent = "Here I am, still holding on to every word that I say.";
    descriptionText2.textContent = "This may be what finally breaks me";
    dlButton.style.display = "flex";
    dlButton.href = "./Memories.zip";
    document.getElementById("dl_button_img").src="./images/ZipIcon.png";
    dlTxt.textContent = "Memories.zip";
    answer = breakMeKey;
    clearText();
    getSolutionStatuses();
});
theoremsAndDreams.addEventListener("click", function() {
    titleText.textContent = "Theorems and Dreams";
    descriptionText.textContent = "What if we went down a different path?";
    descriptionText2.textContent = "Chose a different life?";
    dlButton.style.display = "flex";
    dlButton.href = "./AnotherLife.pdf";
    document.getElementById("dl_button_img").src="./images/PDFicon.png";
    dlTxt.textContent = "AnotherLife.pdf";
    answer = theoremsAndDreamsKey;
    clearText();
    getSolutionStatuses();
});
connections.addEventListener("click", function() {
    titleText.textContent = "Connections";
    descriptionText.textContent = "It's through our connections we know who we are";
    descriptionText2.textContent = "Find our connection and know what we've lost";
    dlButton.style.display = "none";
    answer = connectionsKey;
    clearText();
    getSolutionStatuses();
});
imLost.addEventListener("click", function() {
    titleText.textContent = "I'm Lost";
    descriptionText.textContent = "I just keep searching for someone somewhere";
    descriptionText2.textContent = "(No key will have a space)";
    dlButton.style.display = "flex";
    dlButton.href = "./WeAreAll.zip";
    document.getElementById("dl_button_img").src="./images/ZipIcon.png";
    dlTxt.textContent = "WeAreAll.zip";
    answer = imLostKey;
    clearText();
    getSolutionStatuses();
});
theyKnewMyName.addEventListener("click", function() {
    titleText.textContent = "And They Knew My Name";
    descriptionText.textContent = "Sometimes you don't need to be the best, you only need to be the first";
    descriptionText2.textContent = "{Ok so my bad I may be stupid. I forgot to make a copy of the thing for this before everything was supposed to go live. If I don't fix it in time I'll just give the solution}";
    dlButton.style.display = "none";
    answer = gdKey;
    clearText();
    getSolutionStatuses();
});
behindTheCurtain.addEventListener("click", function() {
    titleText.textContent = "Behind the Curtain";
    descriptionText.textContent = "Ever wonder how the things we're looking at work?";
    descriptionText2.textContent = "What's going on behind the scenes?";
    dlButton.style.display = "none";
    answer = behindTheCurtainKey;
    clearText();
    getSolutionStatuses();
});
putMeBackTogether.addEventListener("click", function() {
    titleText.textContent = "Put Me Back Together";
    descriptionText.textContent = "It wont fix it for you";
    descriptionText2.textContent = "You still need a real solution";
    dlButton.style.display = "flex";
    dlButton.href = "./Arrhythmia.zip";
    document.getElementById("dl_button_img").src="./images/ZipIcon.png";
    dlTxt.textContent = "Arrhythmia.zip";
    answer = putMeBackTogetherKey;
    clearText();
    getSolutionStatuses();
});

const solvedColor = "rgb(32, 51, 81)";

function getSolutionStatuses() {
    var xhr = new XMLHttpRequest();
    //console.log("getting http://localhost:8080/");
    xhr.onprogress = function() {
        let everythingSolved = false;
        let a = JSON.parse(xhr.response);
        console.log(a.imperfectPastStatus);
        //console.log(xhr.response);
        if (a.imperfectPastStatus === "solved") {imperfectPast.style.color = solvedColor;} else {everythingSolved = false;}
        if (a.breakMeStatus === "solved") {loseItAll.style.color = solvedColor;} else {everythingSolved = false;}
        if (a.paranoidStatus === "solved") {paranoid.style.color = solvedColor;} else {everythingSolved = false;}
        if (a.theoremsAndDreamsStatus === "solved") {theoremsAndDreams.style.color = solvedColor;} else {everythingSolved = false;}
        if (a.powerCubeStatus === "solved") {powerCube.style.color = solvedColor;} else {everythingSolved = false;}
        if (a.connectionsStatus === "solved") {connections.style.color = solvedColor;} else {everythingSolved = false;}
        if (a.lostStatus === "solved") {imLost.style.color = solvedColor;} else {everythingSolved = false;}
        if (a.silentClubstepStatus === "solved") {theyKnewMyName.style.color = solvedColor;} else {everythingSolved = false;}
        if (a.curtainStatus === "solved") {behindTheCurtain.style.color = solvedColor;} else {everythingSolved = false;}
        if (a.reconstructedStatus === "solved") {putMeBackTogether.style.color = solvedColor;} else {everythingSolved = false;}
        if (everythingSolved === true) {console.log("You win ig");}
        //return JSON.parse(xhr.response);
    };
    
    xhr.open("GET", "http://192.168.1.167:8080/", true);
    //xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send();
}

getSolutionStatuses();