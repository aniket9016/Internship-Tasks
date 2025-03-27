document.addEventListener("DOMContentLoaded", function () {
    let fetchbtn = document.getElementById('fetchBtn');
    fetchbtn.addEventListener("click", buttonclickhandler);
});

function buttonclickhandler() {
    console.log("Fetch btn");
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'ANIKET.txt', true);
}
