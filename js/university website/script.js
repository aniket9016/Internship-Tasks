function checkbtnsignin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "" || username == null) {
        alert("Enter username");
        return false;
    } else if (password == "" || password == null) {
        alert("Enter password");
        return false;
    } else if (username === 'admin' && password === 'admin') {
        document.getElementById("profilepic").style.display = "flex";
        document.getElementById("btnSubmit").style.display = "none";
        document.getElementById("btnlogin").style.display = "none";        
        // document.getElementById("exampleModal").style.display = "none";        
        return true;
    } else {
        alert('Username or password not matched');
        return false;
    }
}
function checkbtnsubmit() {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var fname = document.getElementById("firstnamecheck").value;
    var lname = document.getElementById("lastnamecheck").value;
    var email = document.getElementById("emailcheck").value;
    var password = document.getElementById("passwordcheck").value;
    var cpw = document.getElementById("cpwdcheck").value;
    var isvalid = true;
    if (fname == "" || fname == null) {
        alert("Enter Firstname");
        return false;
    } else if (lname == "" || lname == null) {
        alert("Enter last name");
        return false;
    } else if (email == "" || email == null) {
        alert("Enter email");
        return false;
    } else if (validRegex.test(email) == false) {
        alert("Email not valid (Ex-example@gmail.com)");
        return false;
    } else if (password == "" || password == null) {
        alert("enter password");
        return false;
    } else if (password.length < 8) {
        alert("Password must be 8 digit long");
        return false;
    } else if (cpw == "" || cpw == null) {
        alert("Enter confirm password");
        return false;
    } else if (cpw != password) {
        alert("Password and confirm password must be same");
        return false;
    } else if (isvalid) {
        return true;
    }
}
window.addEventListener("load", function () {
    setTimeout(function () {
        document.getElementById("preloader").style.display = "none";
    }, 0);
});
function funtimer() {
    document.getElementById("divQuemain").style.display = "block";
    document.getElementById("btnstart").style.display = "none";
    timerclock();

    const questions = [
        {
            question: "HTML stands for -",
            answer: [
                { text: "HighText Machine Language", correct: false },
                { text: "HyperText and links Markup Language", correct: false },
                { text: "HyperText Markup Language", correct: true },
                { text: "None of these", correct: false }
            ]
        },
        {
            question: "The correct sequence of HTML tags for starting a webpage is -",
            answer: [
                { text: "Head, Title, HTML, body", correct: false },
                { text: "HTML, Body, Title, Head", correct: false },
                { text: "HTML, Head, Title, Body", correct: true }
            ]
        },
        {
            question: "Which element is responsible for making the text bold in HTML?",
            answer: [
                { text: "pre", correct: false },
                { text: "a", correct: false },
                { text: "b", correct: true },
                { text: "br", correct: false }
            ]
        },
        {
            question: "Which tag is used to insert a line-break in HTML?",
            answer: [
                { text: "br", correct: true },
                { text: "a", correct: false },
                { text: "pre", correct: false },
                { text: "b", correct: false }
            ]
        },
        {
            question: "Which character is used to represent the closing of a tag in HTML?",
            answer: [
                { text: "|", correct: false },
                { text: "!", correct: false },
                { text: "/", correct: true },
                { text: ".", correct: false }
            ]
        },
        {
            question: "What does the term user represent?",
            answer: [
                { text: "The program controlling the computer.", correct: false },
                { text: "The computer.", correct: false },
                { text: "The person using the computer.", correct: true },
                { text: "The central processing unit.", correct: false }
            ]
        },
        {
            question: "What can be found on the desktop?",
            answer: [
                { text: "The mouse.", correct: false },
                { text: "Icons, or pictures representing programs.", correct: true },
                { text: "The operating system.", correct: false },
                { text: "All the files on the computer.", correct: false }
            ]
        },
        {
            question: "What qualifies as hardware?",
            answer: [
                { text: "The keyboard, mouse, the screen", correct: true },
                { text: "Icons, programs, and the mouse pointer", correct: false },
                { text: "The hard drive, operating system, and CPU", correct: false },
                { text: "CD-ROMs, RAM, and the desktop", correct: false }
            ]
        },
        {
            question: "The hard drive allows you to store files in areas called...",
            answer: [
                { text: "Icons, or the desktop", correct: false },
                { text: "RAM, or ROM", correct: false },
                { text: "Subdirectories, or folders", correct: true },
                { text: "Operating systems", correct: false }
            ]
        },
        {
            question: "Which of the following attribute is used to provide a unique name to an element?",
            answer: [
                { text: "class", correct: false },
                { text: "id", correct: true },
                { text: "type", correct: false },
                { text: "None of the above", correct: false }
            ]
        }
    ];

    const qe = document.getElementById("question");
    const answerbtn = document.getElementById("answer-buttons");
    const nextbtn = document.getElementById("next-btn");
    let currQI = 0;
    let score = 0;

    function startquiz() {
        currQI = 0;
        score = 0;
        nextbtn.innerHTML = "Next";
        showQuestion();
    }

    function showQuestion() {
        resetstate();
        timerclock();
        let currQ = questions[currQI];
        qe.innerHTML = (currQI + 1) + ". " + currQ.question;

        currQ.answer.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn", "btn-outline-dark");
            answerbtn.appendChild(button);
            button.dataset.correct = answer.correct;
            button.addEventListener("click", selectanswer);
        });
    }

    function resetstate() {
        nextbtn.style.display = "none";
        answerbtn.innerHTML = "";
        document.getElementById("divtm").style.display = "flex";
    }

    function selectanswer(e) {
        clearInterval(window.timerInterval);
        const selectbtn = e.target;
        const iscorrect = selectbtn.dataset.correct === "true";

        if (iscorrect) {
            selectbtn.classList.add("correct");
            score++;
        } else {
            selectbtn.classList.add("incorrect");
        }

        Array.from(answerbtn.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });

        nextbtn.style.display = "block";
    }

    function showscore() {
        resetstate();
        qe.innerHTML = `You scored ${score} out of ${questions.length}!`;
        document.getElementById("divtm").style.display = "none";
        nextbtn.innerHTML = "Play Again";
        nextbtn.style.display = "block";
    }

    function handlenextbutton() {
        clearInterval(window.timerInterval);
        currQI++;
        if (currQI < questions.length) {
            showQuestion();
        } else {
            showscore();
        }
    }

    nextbtn.addEventListener("click", () => {
        if (currQI < questions.length) {
            handlenextbutton();
        } else {
            startquiz();
        }
    });

    startquiz();

    function timerclock() {
        let t = 30;
        let timert = document.getElementById("timert");
        clearInterval(window.timerInterval);

        window.timerInterval = setInterval(() => {
            timert.innerHTML = t;
            if (t <= 0) {
                handlenextbutton();
                timerclock();
                //clearInterval(window.timerInterval);
            }
            t--;
        }, 1000);
    }
}
function addNote() {
    const noteTitle = document.getElementById('noteTitle');
    const noteDescription = document.getElementById('noteDescription');
    const notesContainer = document.getElementById('notesContainer');
    if (noteTitle.value == "" || noteTitle.value == null || noteDescription.value == "" || noteDescription.value == null) {
        alert("Please enter both a title and a description!");
        return;
    }

    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
        <h3>${noteTitle.value}</h3>
        <p>${noteDescription.value}</p>
        <button class="delete-btn" onclick="deleteNote(this)">
            <i class="fas fa-trash-alt"></i>
        </button>
    `;
    notesContainer.appendChild(note);
    noteTitle.value = '';
    noteDescription.value = '';
}
function deleteNote(button) {
    const note = button.parentElement;
    note.remove();
}
function deleteAllNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
}