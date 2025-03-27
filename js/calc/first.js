let result;
let num1;
let num2;
let calc;
function funbtn1() {
    document.getElementById("value").value += 1
}
function funbtn2() {
    document.getElementById("value").value += 2
}
function funbtn3() {
    document.getElementById("value").value += 3
}
function funbtn4() {
    document.getElementById("value").value += 4
}
function funbtn5() {
    document.getElementById("value").value += 5
}
function funbtn6() {
    document.getElementById("value").value += 6
}
function funbtn7() {
    document.getElementById("value").value += 7
}
function funbtn8() {
    document.getElementById("value").value += 8
}
function funbtn9() {
    document.getElementById("value").value += 9
}
function funbtn0() {
    document.getElementById("value").value += 0
}
function funadd() {
    num1 = document.getElementById("value").value;
    document.getElementById("value").value = "";
    calc = 1;
}
function funsub() {
    num1 = document.getElementById("value").value;
    document.getElementById("value").value = "";
    calc = 2;
}
function funmul() {
    num1 = document.getElementById("value").value;
    document.getElementById("value").value = "";
    calc = 3;
}
function fundiv() {
    num1 = document.getElementById("value").value;
    document.getElementById("value").value = "";
    calc = 4;
}
function funresult() {
    num2 = document.getElementById("value").value;
    if (calc == 1) {
        result = parseInt(num1) + parseInt(num2);
    } else if (calc == 2) {
        result = parseInt(num1) - parseInt(num2);
    } else if (calc == 3) {
        result = parseInt(num1) * parseInt(num2);
    } else if (calc == 4) {
        result = parseInt(num1) / parseInt(num2);
    }
    document.getElementById("value").value = result;
}
function funclear() {
    document.getElementById("value").value = "";
}