var TextToRead = "";
var textColor = "#162727";//"darkslategray"; //"blanchedalmond";
var arr;
var timer;
var isPaused = false;
var allText = document.getElementById("AllText");
var pauseBtn = document.getElementById("PauseBtn");
var seekbar = document.getElementById("seekbar");
var slider = document.getElementById("slider");

var previousWordsInContext = 5;
var nextWordsInContext = 6;

var index = -1;

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

ctx.canvas.width  = window.innerWidth * (4/5);
ctx.canvas.height = window.innerHeight * (4/5);

allText.style.width = window.innerWidth * (0.8/5);
allText.style.height = window.innerHeight * (4/5);

// DrawWord(word);
// ClearCanvas();
function PauseBarActive(active, control)
{
    isPaused = active;
    if(active)
        control.innerHTML = "PAUSED..";
    else
        control.innerHTML = "Hover to pause";
}
function Start()
{
    if(timer != undefined)
        clearInterval(timer);

    //String.prototype.replace()
    TextToRead = allText.value.replace(/\n/g, " ").replace("  "," ");
    arr = CreateArray(TextToRead);
    index = -1;
    var duration = document.getElementById("duration").value;
    if(duration == undefined || duration == NaN || duration == "")
    {
        duration = 1000;
    }
    timer = setInterval(myTimer, duration);
}
function Pause()
{
    if(isPaused)
    {
        isPaused = false;
        pauseBtn.setAttribute("value", "Pause");
    }
    else if(!isPaused)
    {
        isPaused = true;
        pauseBtn.setAttribute("value", "Play");
    }
        
}


function CreateArray(str)
{
    return str.trim().split(" ");
}

function myTimer() 
{
    if(isPaused)
        return;

    var word = GetNextWord();
    if(word == undefined)
    {
        word = "~~~";
        DrawWord(word);
        clearInterval(timer);
    }
    ClearCanvas();
    ShowWord(word);
    ShowContext();
    progressSlider();
}

function ShowWord(word)
{
    DrawWord(word, canvas.width/2, canvas.height/2, "200px Segoe UI", "LightGray");
}
function ShowContext()
{
    DrawWord(GetPreviousWords() + GetNextWords(), canvas.width/2, canvas.height * 0.9, "50px Segeo UI", "Gray");
}
function DrawWord(word, x, y, font, color)
{
    ctx.font = font;
    ctx.fillStyle = (color != undefined)? color : textColor;
    ctx.textAlign = "center";
    ctx.fillText(word, x, y);
}

function ClearCanvas()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function GetNextWord()
{
    index++;
    return arr[index];
}

function GetPreviousWords()
{
    count = previousWordsInContext;
    if(index < 5)
        count = index;
    words = "";
    for(var i = index - 1; i > index - count; i--)
    {
        words = arr[i] + " " + words;
    }
    return words;
}

function GetNextWords()
{
    count = nextWordsInContext;
    if(arr.length - index < 5)
        count = arr.length - index;
    words = "";
    for(var i = index; i < index + count; i++)
    {
        words = words + " " + arr[i];
    }
    return words;
}

//seekbar code
function seek(e)
{
    slider.style.left = e.clientX - slider.offsetWidth / 2 + 'px';
    index = parseInt(arr.length * (e.clientX / seekbar.offsetWidth)) - 1; 
    console.log(arr.length);
    console.log(seekbar.offsetWidth);
    console.log(e.clientX);
    console.log(parseInt(arr.length * (e.clientX / seekbar.offsetWidth)) - 1);
}

function getStepLength()
{
    return seekbar.offsetWidth/arr.length;
}

function progressSlider()
{
    slider.style.left = slider.offsetLeft + getStepLength() +'px';
}

// setInterval(progressSlider, 1000);