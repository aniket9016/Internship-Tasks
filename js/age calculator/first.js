function checkdob() {
    var dob = document.getElementById("dob").value;
    var dobyear = new Date(dob);
    var d1 = dobyear.getFullYear();
    var currdate = new Date();
    var d2 = currdate.getFullYear();
    if (!d1 || d2 - d1 <= 0) {
        alert("Enter a valid age.");
    } else {
        document.getElementById("dobyear").innerHTML = (d2 - d1) + " Years Old";
    }
}