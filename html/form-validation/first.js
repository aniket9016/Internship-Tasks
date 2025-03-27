function validateform() {
    var name = document.getElementById("name").value;
    var sname = document.getElementById("sname").value;
    var address = document.getElementById("address").value;
    var pincode = document.getElementById("pincode").value;
    var city = document.getElementById("city").value;
    var SSC = document.getElementById("SSC").checked;
    var HSC = document.getElementById("HSC").checked;
    var email = document.getElementById("email").value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var password = document.getElementById("password").value;
    var cpassword = document.getElementById("cpassword").value;

    var isvalid = true;

    if (name == null || name == "") {
        alert("Name can't be blank");
        return false;
    } else if (sname == null || sname == "") {
        alert("Last name can't be blank");
        return false;
    } else if (address == null || address == "") {
        alert("Address can't be blank");
        return false;
    } else if (pincode == "" || pincode == null) {
        alert("Pincode can't be blank");
        return false;
    } else if (pincode.length < 6) {
        alert("Enter valid pincode");
        return false;
    } else if (city == 0) {
        alert("Select a city");
        return false;
    } else if (!SSC) {
        alert("Check ssc");
        return false;
    } else if (!HSC) {
        alert("check HSC");
        return false;
    } else if (email == null || email == "") {
        alert("email can't be blank");
        return false;
    } else if (validRegex.test(email) == false) {
        alert("email not valid");
        return false;
    } else if (password == null || password == "") {
        alert("password can't be blank");
        return false;
    } else if (password.length < 8) {
        alert("password must be 8 character long");
        return false;
    } else if (cpassword == null || cpassword == "") {
        alert("confirm password can't be blank");
        return false;
    } else if (cpassword != password) {
        alert("confirm password and password must be same");
        return false;
    } else if (isvalid) {
        confirm("Do you want to submit the form");
        return true;
    }
}

function checkname() {
    var name = document.getElementById("name").value;
    if (name == "" || name == null) {
        document.getElementById("errfname").style.display = "block";
        document.getElementById("name").focus();
    } else {
        document.getElementById("errfname").style.display = "none";
    }
    document.getElementById("name").addEventListener("input", function () {
        document.getElementById("errfname").style.display = "none";
    });
}

function checksurname() {
    var name = document.getElementById("sname").value;
    if (name == "" || name == null) {
        document.getElementById("errlname").style.display = "block";
        document.getElementById("sname").focus();
    } else {
        document.getElementById("errlname").style.display = "none";
    }
    document.getElementById("sname").addEventListener("input", function () {
        document.getElementById("errlname").style.display = "none";
    });
}

function checkaddress() {
    var name = document.getElementById("address").value;
    if (name == "" || name == null) {
        document.getElementById("erremail").style.display = "block";
        document.getElementById("address").focus();
    } else {
        document.getElementById("erremail").style.display = "none";
    }
    document.getElementById("address").addEventListener("input", function () {
        document.getElementById("erremail").style.display = "none";
    });
}

function checkpincode() {
    var name = document.getElementById("pincode").value;
    if (name == "" || name == null) {
        document.getElementById("errpincode1").style.display = "block";
        document.getElementById("errpincode2").style.display = "none";
        document.getElementById("pincode").focus();
    } else if (name.length < 6) {
        document.getElementById("errpincode1").style.display = "none";
        document.getElementById("errpincode2").style.display = "block";
        document.getElementById("pincode").focus();
    } else {
        document.getElementById("errpincode1").style.display = "none";
        document.getElementById("errpincode2").style.display = "none";
    }
    document.getElementById("pincode").addEventListener("input", function () {
        document.getElementById("errpincode1").style.display = "none";
    });
    document.getElementById("pincode").addEventListener("input", function () {
        document.getElementById("errpincode2").style.display = "none";
    });
}

function checkcity() {
    var name = document.getElementById("city").value;
    if (name == 0) {
        document.getElementById("errcity").style.display = "block";
        document.getElementById("city").focus();
    } else {
        document.getElementById("errcity").style.display = "none";
    }
    document.getElementById("city").addEventListener("input", function () {
        document.getElementById("errcity").style.display = "none";
    });
}

function checkssc() {
    var SSC = document.getElementById("SSC");
    if (SSC.checked==false) {
        document.getElementById("errssc").style.display = "block";
        document.getElementById("SSC").focus();
    } else {
        document.getElementById("errssc").style.display = "none";
    }
}

function checkhsc() {
    var HSC = document.getElementById("HSC");
    if (HSC.checked==false) {
        document.getElementById("errhsc").style.display = "block";
        document.getElementById("HSC").focus();
    } else {
        document.getElementById("errhsc").style.display = "none";
    }
}

function checkemail() {
    var name = document.getElementById("email").value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (name == "" || name == null) {
        document.getElementById("erremail1").style.display = "block";
        document.getElementById("erremail2").style.display = "none";
        document.getElementById("email").focus();
    } else if (validRegex.test(name) == false) {
        document.getElementById("erremail1").style.display = "none";
        document.getElementById("erremail2").style.display = "block";
        document.getElementById("email").focus();
    } else {
        document.getElementById("erremail1").style.display = "none";
        document.getElementById("erremail2").style.display = "none";
    }
    document.getElementById("email").addEventListener("input", function () {
        document.getElementById("erremail1").style.display = "none";
    });
    document.getElementById("email").addEventListener("input", function () {
        document.getElementById("erremail2").style.display = "none";
    });
}

function checkpwd() {
    var name = document.getElementById("password").value;
    if (name == "" || name == null) {
        document.getElementById("errpwd").style.display = "block";
        document.getElementById("errpwd2").style.display = "none";
        document.getElementById("password").focus();
    } else if (name.length < 8) {
        document.getElementById("errpwd").style.display = "none";
        document.getElementById("errpwd2").style.display = "block";
        document.getElementById("password").focus();
    } else {
        document.getElementById("errpwd").style.display = "none";
        document.getElementById("errpwd2").style.display = "none";
    }
    document.getElementById("password").addEventListener("input", function () {
        document.getElementById("errpwd").style.display = "none";
    });
    document.getElementById("password").addEventListener("input", function () {
        document.getElementById("errpwd2").style.display = "none";
    });
}


function checkcpwd() {
    var pwd = document.getElementById("password").value;
    var cpwd = document.getElementById("cpassword").value;
    if (pwd != cpwd) {
        document.getElementById("errcpwd").style.display = "block";
        document.getElementById("cpassword").focus();
    }
    document.getElementById("cpassword").addEventListener("input", function () {
        document.getElementById("errcpwd").style.display = "none";
    });
}
