
let lines = document.querySelectorAll('.line');
let start = document.querySelector('#start');
let balance = document.querySelector('#balance');
let add = document.querySelector('#add');
var akaudio = new Audio("./assets/audio/ak.mp3");
var payout = new Audio("./assets/audio/payout.wav");
var spining = new Audio("./assets/audio/spining.wav");
let cash = 0;
let minus = 20;
var audio = false;
/* Field values start */
let items = [
    {
        pts: 2,
        name: 'banana',
        five: 50
    },
    {
        pts: 2,
        name: 'bell',
        five: 70
    },
    {
        pts: 3,
        name: 'cherries',
        five: 90
    },
    {
        pts: 3,
        name: 'joker',
        five: 110
    },
    {
        pts: 4,
        name: 'money-bag',
        five: 130
    },
    {
        pts: 4,
        name: 'orange',
        five: 150
    },
    {
        pts: 5,
        name: 'poker',
        five: 170
    },
    {
        pts: 6,
        name: 'rocket',
        five: 250
    } ];
/* Field values end */

/* Set lines in up position */
for(let i = 0; i < lines.length; i++){
    lines[i].style.top = -3200 + 'px';
}
// balance.style.color = 'red';
start.setAttribute('disabled', true); //block start

let massive2 = new Array(5).fill(0); //one more massive for second function call - start()

//footer actions
start.onclick = spin;
add.onclick = addPTS;
balance.innerHTML = cash;

//add cash
function addPTS(){
    payout.play();
    add.blur();
    cash += 100;
    balance.innerHTML = cash;
    balance.style.color = 'white';
    start.removeAttribute('disabled');
}

//main
function spin(){
    if(!audio) {
        akaudio.play();
        audio = true;
    }
    spining.play();
    if(cash >= minus){
        start.setAttribute('disabled', true);
        cash -= minus;
        balance.innerHTML = cash;
        for(let i = 0; i < lines.length; i++){
           lines[i].style.transition = null; //animation off
           lines[i].style.top = -3200 + massive2[i] + 'px'; //locate up
        }

        requestAnimationFrame(function(){
            requestAnimationFrame(function(){

            let randArr = new Uint32Array(5);
            window.crypto.getRandomValues(randArr); //random function
            let arr = Array.from(randArr);
            let framePosition = arr.map(n => (n%8 + 9)); //set randomized elements from 9 to 16
            let mainItemPos = [];
            let temp = []
            for(let i = 0; i < lines.length; i++){
                let mainPosition = -3200 + framePosition[i]*200; //took position of element that displayed on screen
                let time = i * 0.2 + 1;
                lines[i].style.transition = `all ease ${time}s`; //animation
                lines[i].style.top = mainPosition + 'px'; //scroll down to the mainposition element
                mainItemPos.push(mainPosition / 200);
                temp[i] = (Math.abs(mainItemPos[i]) + 1) % 8; //define elem last elem
                massive2[i] = mainItemPos[i] * 200; //count range for next function call
            }
            let result = {};
            temp.forEach(a => {result[a] = result[a] + 1 || 1;}); //count similar elem
            for(let i in result){
                //count winning
                if(result[i] == 2){
                    if(result[i + 1] == 3){
                        cash += 3 * (items[i+1].pts + 1);
                    }
                    cash += 2 * items[i].pts;
                } else if(result[i] == 3){
                    if(result[i + 1] == 2){
                        cash += 2 * items[i+1].pts;
                        cash += 3 * (items[i].pts + 1);
                        break;
                    }
                    cash += 3 * (items[i].pts+1);
                } else if(result[i] == 4){
                    cash += 4 * items[i].pts*items[i].pts;
                }
                else if(result[i] == 5){
                    cash += items[i].five;
                }
            }
            setTimeout(() => {
                balance.innerHTML = cash; //+ win cash
                if(cash >= minus) {start.removeAttribute('disabled');}
                }, 1800);
            })
        });
    }
}
