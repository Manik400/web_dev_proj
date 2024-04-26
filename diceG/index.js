var nm = Math.floor(Math.random()*6) +1;
var st = "dice" + nm + ".png";
var source = "images/" + st;
var img1 = document.querySelectorAll("img")[0];
img1.setAttribute("src" , source);

var nm2 = Math.floor(Math.random()*6) +1;
var st2 = "dice" + nm2 + ".png";
var source2 = "images/" + st2;
var img2 = document.querySelectorAll("img")[1];
img2.setAttribute("src" , source2);

if(nm > nm2){
    document.querySelector("h1").innerHTML = "🚩Player 1 wins🚩";
}
else if(nm < nm2){
    document.querySelector("h1").innerHTML = "🚩Player 2 wins🚩";
}
else{
    document.querySelector("h1").innerHTML = "Draw";
}