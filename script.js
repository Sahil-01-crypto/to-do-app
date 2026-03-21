let form = document.querySelector(".form")
let input = document.querySelector("#inputbox")
let submit = document.querySelector("#submitbox")
let error = document.querySelector(".error")
let to_do = document.querySelector(".toddos")
let total = document . querySelector(".total")
let done = document . querySelector(".done")
let pending = document.querySelector(".pending")

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

    
   

    
    
    todos.forEach(function (text, index) {
       

        let li = document.createElement("li")
       
        let span = document.createElement("span");
        span . textContent= text .task

        // checkbox
        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked= text.completed
        checkbox.addEventListener("change" , function(){
            if(checkbox.checked){
               
                
                //update the  array 
                todos[index].completed=checkbox.checked;

                // adding line through if checked
                li.style.textDecoration="line-through"
                localStorage.setItem("todos", JSON.stringify(todos))
                

            }
            else{
                todos[index].completed =checkbox.checked
                li.style.textDecoration="none"
                  localStorage.setItem("todos", JSON.stringify(todos))
                
            }
            displayTodos()
        
            
            
        })


        // Delete button
        let delbtn = document.createElement("button")
        delbtn.innerText = "Delete"

        delbtn.addEventListener("click", function () {
            todos.splice(index, 1);
          
            localStorage.setItem("todos", JSON.stringify(todos))

            displayTodos();

        })


        //edit
        span.addEventListener("dblclick", function () {
            let val = prompt("Enter The Task")

            if (val.trim() === "") return
            // /updating the array
            todos[index].task = val;
            

            // save  in our localstorage
            localStorage.setItem("todos", JSON.stringify(todos))

            // re-render UI
            displayTodos();



        })
        
        li.appendChild(checkbox)
        li.appendChild(span)
        li.appendChild(delbtn)
        to_do.appendChild(li)

    })
}
