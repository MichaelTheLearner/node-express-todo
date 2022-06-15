
// const addTaskButton = document.querySelectorAll('.addTaskButton')
const deleteTaskButtons = document.querySelectorAll('.task-delete')
const deleteActionListButtons = document.querySelectorAll('.actionList-closeButton')
const todos = document.querySelectorAll('.todo-li');
const actionLists = document.querySelectorAll('.actionList');

// todo listeners
Array.from(todos).forEach((element) => {
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragend', dragEnd);
})

async function dragStart(ev){
    this.className += ' dragging';
    ev.dataTransfer.setData("taskID", this.childNodes[1].innerText);
    ev.dataTransfer.setData("listID", this.childNodes[3].innerText);
    ev.dataTransfer.setData("taskName", this.childNodes[5].innerText);
    setTimeout(() => this.className += "hidden", 0)
}

async function dragEnd(){
    this.classList.remove('hidden');
}

//action lists
Array.from(actionLists).forEach((element) => {
    element.addEventListener('dragover', dragOver)
    element.addEventListener('dragenter', dragEnter)
    element.addEventListener('dragleave', dragLeave)
    element.addEventListener('drop', dragDrop)
})

async function dragOver(e){
    e.preventDefault();

}
async function dragEnter(e){
    e.preventDefault();
    this.className += ' hovered';
}
async function dragLeave(){
    this.classList.remove('hovered')
}
async function dragDrop(ev){
    // const taskID = this.childNodes[1].innerText;
    // const oldListID = this.querySelector('.listID').innerText;
    // const taskName = this.querySelector('.task-name').innerText;
    ev.preventDefault();
    const taskID = ev.dataTransfer.getData("taskID");
    const oldListID = ev.dataTransfer.getData("listID");
    const taskName = ev.dataTransfer.getData("taskName");
    const newListId = this.attributes.name.nodeValue;

    await addTaskArgs(newListId, taskName)
    await deleteTaskArgs(oldListID, taskID)
    
    location.reload();
}


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

async function deleteTaskArgs(listID, taskID) {    

    try {
        const response = await fetch('deleteTask', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'tableID': listID,
                'taskID': taskID
            })
        })
        const data = await response.json()
        console.log(data)
    }catch(err){
        console.log(err)
    }
}



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
        location.reload();
    }catch(err){
        console.log(err)
    }
}

// async function addTask() {
//     const listID = this.parentNode.childNodes[1].innerText;
//     const taskName = this.parentNode.childNodes[2].innerText;

//     try {
//         const response = await fetch('addToDo', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 'id': listID,
//                 'taskName': taskName
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }    
// }

async function addTaskArgs(listID, taskName) {
    

    try {
        const response = await fetch('addToDo', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': listID,
                'taskName': taskName
            })
        })

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

