
// const addTaskButton = document.querySelectorAll('.addTaskButton')


// Array.from(addTaskButton).forEach((element) => {
//     element.addEventListener('click', addTask);
// })

// document.querySelector('#addListBeta').addEventListener('click', addList);

// const addList = async () => {

// }


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
