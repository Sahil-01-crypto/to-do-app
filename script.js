let form = document.querySelector(".form")
let input = document.querySelector("#inputbox")
let submit = document.querySelector("#submitbox")
let error = document.querySelector(".error")
let to_do = document.querySelector(".toddos")
let total = document.querySelector(".total")
let done = document.querySelector(".done")
let pending = document.querySelector(".pending")
let notask = document.querySelector(".notask")

//load the existing task if available .. else return empty array 
let todos = JSON.parse(localStorage.getItem("todos")) || []

// display the fetched data 
displayTodos();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (input.value.trim() === "") {
        error.textContent = "Task Cannot Be Empty"
        return
    }
    else {
        error.textContent = ""
    }


    todos.push({
        task: input.value,
        completed: false
    });
    localStorage.setItem("todos", JSON.stringify(todos))

    input.value = "";

    displayTodos();

})

function displayTodos() {
    to_do.innerHTML = "";
    let completed = todos.filter(todo => todo.completed).length;
    total.textContent = "Total Tasks: " + todos.length;
    done.textContent = completed;
    pending.textContent = todos.length - completed;

    //if no task 
    if (todos.length === 0) {
        let emptymsg = document.createElement("p")
        emptymsg.textContent = "No tasks available"
        emptymsg.classList.add("emptymsg")

        to_do.appendChild(emptymsg)
        return

    }



    todos.forEach(function (text, index) {
        let li = document.createElement("li")
        li.classList.add("listwa")

        if (text.completed) {
            li.style.textDecoration = "line-through"

        }
        else {
            li.style.textDecoration = "none"
        }

        let span = document.createElement("span");
        span.textContent = text.task

        // checkbox
        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = text.completed
        checkbox.addEventListener("change", function () {
            todos[index].completed = checkbox.checked;

            localStorage.setItem("todos", JSON.stringify(todos))

            displayTodos();




        })


        // Delete button
        let delbtn = document.createElement("button")
        delbtn.classList.add("deletebtn")
        delbtn.innerText = "Delete"

        delbtn.addEventListener("click", function () {
            todos.splice(index, 1);

            localStorage.setItem("todos", JSON.stringify(todos))

            displayTodos();

        })


        //edit
        let editbtn = document.createElement("button")
        editbtn.textContent = "Edit"
        editbtn.classList.add("edit")
        editbtn.addEventListener("click", function () {
            let val = prompt("Enter  the Task")
            if (val === null || val.trim() === "") {
                return
            }
            todos[index].task = val;

            localStorage.setItem("todos", JSON.stringify(todos))

            displayTodos()

        })




        let hr = document.createElement("hr")
        hr.classList.add("listhr")
        li.appendChild(checkbox)
        li.appendChild(span)
        li.appendChild(editbtn)
        li.appendChild(delbtn)
        to_do.appendChild(li)
        to_do.appendChild(hr)

    })
}
