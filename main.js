const screen = document.getElementById('screen');
const buttons = {
    start: document.getElementById('startBtn'),
    stop: document.getElementById('stopBtn'),
    reset: document.getElementById('resetBtn')
};
let timer_started = false;
const timeout = 100; // 10th of a sec timeout
let spacer_S, spacer_M, spacer_MS;
// Timer properties are numbers
const Timer = {
    M:0, // minutes
    S:0, // seconds
    MS:0 // milliseconds
};

const loadSettings = () => {
    buttons.stop.style.display = 'none';
};

const animateTimer = () => {
    
    (function(){
        /* 
            SPACERS FUNCTION

            - it determines how many 0s it should add to the output
        */
        spacer_S = Timer.S.toString().length < 2 ? 0 : '';
        spacer_M = Timer.M.toString().length < 2 ? 0 : '';
        spacer_MS = Timer.MS.toString().length;
        if(spacer_MS == 1){
            spacer_MS = '00';
        }else if(spacer_MS == 2){
            spacer_MS = '0';
        }else if(spacer_MS == 4){
            
        }else{
            spacer_MS = '';
        }
    })();

    screen.innerHTML = `${spacer_M}${Timer.M} : ${spacer_S}${Timer.S} : ${Timer.MS}${spacer_MS}`;
    //console.log(Timer.S.toString().length);
    window.requestAnimationFrame(animateTimer);
};

let startTimer2 = null;
const startTimerHandler = () => {
    
    let startTimer = () => {

        Timer.MS += timeout;
            if(Timer.MS >= 1000){
                Timer.MS = 0;
                Timer.S++;
            }
            if(Timer.S >= 60){
                Timer.S = 0;
                Timer.M++;
            }
    
    
            startTimer2 = setTimeout(startTimer, timeout);
            console.log(startTimer2);
        };  
        startTimer();
};
buttons.start.onclick = () => {
    if(!timer_started){
        startTimerHandler();
        timer_started = true;
        buttons.start.style.display = 'none';
        buttons.stop.style.display = 'block';
        }
};
buttons.stop.onclick = () => {
    clearTimeout(startTimer2);
    timer_started = false;
    buttons.start.style.display = 'block';
    buttons.stop.style.display = 'none';
};
buttons.reset.onclick = () => {
    Timer.M = 0;
    Timer.S = 0;
    Timer.MS = 0;
};

loadSettings();
window.requestAnimationFrame(animateTimer);