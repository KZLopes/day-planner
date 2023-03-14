const deleteButton = document.querySelectorAll('.fa-trash')
const completeButton = document.querySelectorAll('.fa-check')

Array.from(deleteButton).forEach(elem => {elem.addEventListener('click', deleteTask)})
Array.from(completeButton).forEach(elem => {elem.addEventListener('click', toggleComplete)})

async function deleteTask() {
  const tDate = this.parentNode.childNodes[1].innerText
  const tTitle = this.parentNode.childNodes[3].innerText
  try {
    const response = await fetch('deleteTask', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'delDate': tDate,
        'delTitle': tTitle
      })
    })
  location.reload()
  } catch (err) {
    console.error(err);    
  }
}

async function toggleComplete() {
  const tDate = this.parentNode.childNodes[1].innerText
  const tTitle = this.parentNode.childNodes[3].innerText
  const tComplete = this.parentNode.childNodes[5].innerText
  try {
    const response = await fetch('taskCompletion', {
      method:'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'findDate': tDate,
        'findTitle': tTitle,
        'findCompletion': tComplete        
      })
    })
  location.reload()
  } catch (err) {
    console.error(err);    
  }
}