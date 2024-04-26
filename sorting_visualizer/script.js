var n = 10;
const arr = [];
init();

function init() {
    // n = 10;
    // container.innerHTML = "";    
  for (let i = 0; i < n; i++) {
    arr[i] = Math.random();
  }
  showb();
}

function playi(){
    // console.log(123);
    const copy = [...arr];
    const swapps = insertionsort(copy);
    animate(swapps);
    
}

function playb(){
    // console.log(123);
    const copy = [...arr];
    const swapps = bublesort(copy);
    animate(swapps);
    
}

function animate(swaps){
    if(swaps.length == 0){showb();return;}

    const move= swaps.shift();
    const [i,j] = move.indices;
    if(move.type == "swap"){
        [arr[i] , arr[j]] = [arr[j] , arr[i]];
    }
    
    showb(move);
    setTimeout(function(){
        animate(swaps);
    },50);
}


function insertionsort(arr){
    console.log("insertion");
    const swapps = [];
    for(let k = 0 ; k < arr.length ; k ++){
        let j  = k-1;
        let i = k;
        do{
            var swap = false;
            swapps.push({indices : [j,i] , type : "comp"});
            if(arr[i] < arr[j]){
                swap = true;
                swapps.push({indices : [j,i] , type : "swap"});
                [arr[i] , arr[j]] = [arr[j] , arr[i]];
                i--;
                j--;
            }
        }while(swap);
    }
    return swapps;
}

function bublesort(arr){
    console.log("buble");

    const swapps = [];
    do{var swap = false;
    for(let i = 1 ; i < arr.length; i++){
        swapps.push({indices : [i-1,i] , type : "comp"});
        if(arr[i] < arr[i-1]){
            swap = true;
            swapps.push({indices : [i-1,i] , type : "swap"});
            // swapps.push([i-1,i]);
            [arr[i-1],arr[i]] = [arr[i] , arr[i-1]];
        }
    }}while(swap);
    return swapps;
}

function showb(move) {
    container.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = arr[i] * 100 + "%";
    bar.classList.add("bar");
    if(move && move.indices.includes(i)){
        bar.style.backgroundColor = move.type == "swap" ? "Black" : "Blue";
    }
    container.appendChild(bar);
  }
}

