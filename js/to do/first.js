function addlist() {
    var li=document.createElement("li");
    var task = document.getElementById("todotext").value;
    var t=document.createTextNode(task);
    li.appendChild(t);
    if (task) {
        document.getElementById("todolist").appendChild(li);
        document.getElementById("todotext").value = ""
    }else{
        alert("Enter a value");
    }
}