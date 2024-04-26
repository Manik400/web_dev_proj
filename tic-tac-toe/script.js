let box1 = document.querySelector(".box1");
let box2 = document.querySelector(".box2");
let box3 = document.querySelector(".box3");
let box4 = document.querySelector(".box4");
let box5 = document.querySelector(".box5");
let box6 = document.querySelector(".box6");
let box7 = document.querySelector(".box7");
let box8 = document.querySelector(".box8");
let box9 = document.querySelector(".box9");
let newB = document.querySelector(".btn");
let boxes = document.querySelectorAll(".box");
let info = document.querySelector(".gameinfo");

let currentPlayer;
let gameGrid;

function init(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index+1}`;
    });
    newB.classList.remove("active");
    info.innerText = `Current Player - ${currentPlayer}`;
}

init();
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function swap() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    info.innerText = `Current Player - ${currentPlayer}`;
}

function checkwin(){
    let ans = "";

    winningPositions.forEach((pos) => {
        if((gameGrid[pos[0]] !== "") && (gameGrid[pos[1]] !== "") && (gameGrid[pos[2]] !== "") && ((gameGrid[pos[0]]) === (gameGrid[pos[1]])) && ((gameGrid[pos[1]]) === (gameGrid[pos[2]]))){
            if(gameGrid[pos[0]] === "X"){
                ans = "X";
            }
            else{
                ans = "O";
            }

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
        }
    });

    if(ans !== ""){
        info.innerText = `Winner Player - ${ans}`;
        newB.classList.add("active");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        info.innerText = "Game Tied !";
        newB.classList.add("active");
    }
}

function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swap();
        //check koi jeet toh nahi gya
        checkwin();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newB.addEventListener("click", init);