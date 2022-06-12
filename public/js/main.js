
// const addTaskButton = document.querySelectorAll('.addTaskButton')
const deleteTaskButtons = document.querySelectorAll('.task-delete')
const deleteActionListButtons = document.querySelectorAll('.actionList-closeButton')

// Array.from(addTaskButton).forEach((element) => {
//     element.addEventListener('click', addTask);
// })

// document.querySelector('#addListBeta').addEventListener('click', addList);

// const addList = async () => {

// }
Array.from(deleteTaskButtons).forEach((element) => {
    element.addEventListener('click', deleteTask);
})

Array.from(deleteActionListButtons).forEach((element) => {
    element.addEventListener('click', deleteActionList);
})

async function deleteTask() {
    const tableID = this.parentNode.parentNode.parentNode.querySelector('.tableID').value
    console.log(this.parentNode.parentNode.parentNode)
    const taskID = this.parentNode.childNodes[1].innerText;

    try {
        const response = await fetch('deleteTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'tableID': tableID,
                'taskID': taskID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function addTask() {
    const listID = this.parentNode.childNodes[1].innerText;
    const taskName = this.parentNode.childNodes[2].innerText;

    try {
        const response = await fetch('addToDo', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': listID,
                'taskName': taskName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }    
}

async function deleteActionList(){
    const tableID = this.parentNode.parentNode.querySelector('.tableID').value;

    try {
        const response = await fetch('deleteList', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'tableID': tableID
            })
        })
        const data = await response.json();
        
        location.reload()
        console.log(data)
    
    }catch(err){
        console.log(err)
    }
}
