const slider = document.querySelector("[data_lengthSlider]");
const length_display = document.querySelector("[data_lengthNumber]");
const passwordDisplay = document.querySelector(".display");
const copyMessage = document.querySelector("[copy_msg]");
const copyButton = document.querySelector("[copy_button]");
const uppercase = document.querySelector("#uppercase")
const lowercase = document.querySelector("#lowercase")
const nums = document.querySelector("#nums")
const symbols = document.querySelector("#symbols")
const strengthIndicator =  document.querySelector("[data-indicator]")
const generateButton =  document.querySelector(".generateButton")
const allcheck = document.querySelectorAll("input[type=checkbox]")

let password = "";
let passwordLength = 10;
let cc = 0;


// functions :- 
// 1. copypassword
// 2. handleslider
// 3. generatepassword
// 4. setindicator
// 5. getrandomnumber(min, max)
// 6. getrandomuppercase()
// 7. getrandomlowercase()
// 8. getrandomsymbol()

handleSlider();
setindicator('#ccc');

function handleSlider(){
    slider.value = passwordLength;
    length_display.innerHTML = passwordLength;
    console.log('startset');


    // slider me left me bg lagane ka
    let min = slider.min;
    let max = slider.max;
    slider.style.backgroundSize = ((passwordLength - min)*100)/(max-min) + '% 100%';
}

function setindicator(color){
    strengthIndicator.style.backgroundColor = color;
}

function getrandominteger(min, max){
    return (Math.floor(Math.random()*(max-min))) + min;
}

function generaterandomnumber(){
    return getrandominteger(0,9);
}

function generatelowercase(){
    return String.fromCharCode(getrandominteger(97,123));
}


function generateuppercase(){
    return String.fromCharCode(getrandominteger(65,90));
}


function generateSymbol(){
    let symbolstring = "~`!@#$%^&*()_-+={[}]|\:;<,>.?/";
    return symbolstring.charAt(getrandominteger(0,symbolstring.length));
}


function calculatestrength(){
    let aa = false;
    let A = false;
    let a1 = false;
    let a_ = false;

    if(lowercase.checked) aa = true;
    if(uppercase.checked) A = true;
    if(nums.checked) a1 = true;
    if(symbols.checked) a_ = true;

    if(aa && A && (a1 || a_) && passwordLength>=8){
        setindicator("#0f0")
    }else if((aa||A)&&(a1||a_)&&passwordLength>=6){
        setindicator("#ff0")
    }else setindicator("#f00")
}


async function copypassword(){
    try {
        await (navigator.clipboard.writeText(passwordDisplay.value));
        copyMessage.innerHTML = "copied"
    }
    catch(e){
        copyMessage.innerHTML = "failed"
    }

    copyMessage.classList.add('active');

    setTimeout(() => {
        copyMessage.classList.remove("active");
    }, 2000);

}


function checkcounts(){
    cc = 0;
    allcheck.forEach( (checkbx) => { if(checkbx.checked)cc++;});
    if(passwordLength<cc){
        passwordLength=cc;
        handleSlider();
    }
    console.log(`checkcount = ${cc}`);
}

allcheck.forEach( (checkbx) => {
    checkbx.addEventListener('change',checkcounts);
});


slider.addEventListener('input',(e)=> {
    console.log('slide registered');
    passwordLength = e.target.value; 
    handleSlider();    
});

copyButton.addEventListener('click', ()=>{
    if(passwordDisplay.value)copypassword();
});




generateButton.addEventListener('click',() => {
    console.log('zero');
    if(cc<=0) return;
    console.log('one');
    console.log(generateuppercase());
    if(passwordLength<cc){
        passwordLength = cc;
        handleSlider();
    }


    //remove old pass
    password = "";

    //lets satisfy checkboxes first
    let ar = [];

    if(uppercase.checked){
        ar.push(generateuppercase);
    }
    if(lowercase.checked){
        ar.push(generatelowercase);
    }
    if(nums.checked){
        ar.push(generaterandomnumber);
    }
    if(symbols.checked){
        ar.push(generateSymbol);
    }

    // insert remaining
    
    for(let i = 0; i<passwordLength; i++){
        password+=(ar[getrandominteger(0,ar.length)]());
    }

    //now we shuffle the password

    password = shuffle(Array.from(password));

    // display
    passwordDisplay.value = password;


    // strength output
    calculatestrength();

});

function shuffle(array){
    // shuffle karne ke liye ek algo hoti hai fisher yates method
    let i = array.length;
    while (--i > 0) {
        let temp = Math.floor(Math.random() * (i + 1));
        [array[temp], array[i]] = [array[i], array[temp]];
    }
    return array.join('');
}
