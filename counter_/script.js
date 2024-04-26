const cv = document.querySelector('#counter');

let increment = () => {
    let v = parseInt(cv.innerHTML);
    v++;
    cv.innerHTML = v;
}


function decrement(){
    let v = parseInt(cv.innerHTML);
    v--;
    cv.innerHTML = v;
}