const dataPdisp = document.querySelector("[dataPdisp]");
const datalenght = document.querySelector("[data-lenght]");
const datalengthslider = document.querySelector("[data-length-slider]");
const dataindi = document.querySelector("[data-indi]");

const datacopymsg = document.querySelector("[datacopymsg]");
const copybtn = document.querySelector("[ccopy-btn]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbol");
const genpass = document.querySelector(".gen-pass");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// setIndicator();

setIndicator("#ccc");
function handleSlider(){
    datalengthslider.value = passwordLength;
    datalenght.innerHTML = passwordLength;
}

function setIndicator(color){
    dataindi.style.backgroundColor = color;
    dataindi.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndmInt(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRndmInt(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndmInt(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndmInt(65,91));
}

function generateSymbol(){
    const rndmInt = getRndmInt(0,symbols.length);
    return symbols.charAt(rndmInt);
}

function calcStrength(){
    let hasNumber = false;
    let hasUpper = false;
    let hasLower = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNumber = true; 
    if(symbolsCheck.checked) hasSymbol = true;

    if(hasUpper && hasLower && (hasSymbol || hasNumber) && passwordLength >= 8){
        setIndicator("#0f0");
    }else if(
        (hasLower || hasUpper) &&
        (hasSymbol || hasNumber) &&
        passwordLength >= 6
    ){
        setIndicator("#ff0")
    }else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(dataPdisp.value);
        datacopymsg.innerHTML = "copied";
    }catch(e){
        datacopymsg.innerHTML = "failed";
    }
    datacopymsg.classList.add("active");
    setTimeout( () => {
        datacopymsg.classList.remove("active");
        datacopymsg.innerHTML = "";
    },1000);
}


function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

datalengthslider.addEventListener('input' , (e) => {
    passwordLength = e.target.value;
    handleSlider();
})


copybtn.addEventListener('click', () => {
    if(dataPdisp.value)
        copyContent();
})

genpass.addEventListener('click', () => {
    //none of the checkbox are selected

    if(checkCount == 0) 
        return;

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndmInt(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    dataPdisp.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});


