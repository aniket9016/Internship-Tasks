function trial() {
    var number1 = document.getElementById("number1").value;
    var number2 = document.getElementById("number2").value;
    try {
        if (number1 == 0 || number2 == 0) {
            document.getElementById("displaymsg").style.display = "none"
            throw new TypeError(document.getElementById("displaymsg2").innerHTML = "number cannot be zero")
        } else {
            document.getElementById("displaymsg").style.display = "block"
            document.getElementById("displaymsg2").innerHTML = number1 / number2;
        }
    } catch (error) {
        console.log(error);
    } finally {
        console.log(number1/number2);
    }
}