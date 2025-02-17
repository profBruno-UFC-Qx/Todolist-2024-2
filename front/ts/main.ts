const form = document.getElementById('form')
const addButton = document.getElementById('addTask')
const formDescricao = document.getElementById('descricao') as HTMLInputElement
const deadlineInput = document.getElementById('data') as HTMLInputElement
const selectCategory = document.getElementById("categorias") as HTMLSelectElement
const deleteModal = document.getElementById('deleteModal') as HTMLDialogElement
const cancelButton = document.getElementById('cancelButton')
const deleteButton = document.getElementById('deleteButton')
let taskToDelete: string;


deleteButton?.addEventListener('click', async () => {
  await deleteTask(taskToDelete)
  listarTarefas()
  deleteModal.close()
})

formDescricao?.addEventListener('input', () => {
  if(formDescricao.value) {
    addButton?.removeAttribute('disabled')
  } else {
    addButton?.setAttribute('disabled', 'disabled')
  }
})


form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = {
    description: formDescricao.value,
    deadline: deadlineInput.value || undefined,
    done: false,
    category: {
      documentId: selectCategory.value,
      description: selectCategory.options[selectCategory.selectedIndex].text
    }
  }
  createTask(task)
  listarTarefas()
})


getAllCategory().then(res => {

   for(let categoria of res.data) {
    const option = document.createElement('option')
    option.value = categoria.documentId
    option.innerText = categoria.description
    selectCategory?.appendChild(option)
   }
})


function listarTarefas() {
  getAll().then(res => {
  
    const tableBody = document.getElementById("tarefas")
    if(tableBody) {
      tableBody.innerHTML = ''
      for(let task of res.data) {
        const novaLinha = document.createElement('tr')
  
        const description = document.createElement('td')
        description.setAttribute('colspan', '2');
        description.innerText = task.description
  
        const category = document.createElement('td')
        const spanCategory = document.createElement('span')
        spanCategory.innerText = task.category.description
        spanCategory.classList.add('category')
        spanCategory.classList.add(task.category.description.toLocaleLowerCase())
        category.appendChild(spanCategory)
  
        const deadline = document.createElement('td')
        deadline.innerText = task.deadline || ''
  
        const acoes = document.createElement('td')
        const deleteButton = document.createElement('button')
        deleteButton.className = 'delete-button'
        deleteButton.addEventListener('click', (e) => {
          if(task.documentId) {
            showDeleteModal(task)
          }
        })
        
        const icon = document.createElement('i')
        icon.className = 'bi bi-trash3'
        deleteButton.appendChild(icon)
        acoes.appendChild(deleteButton)
  
        novaLinha.appendChild(description)
        novaLinha.appendChild(category)
        novaLinha.appendChild(deadline)
        novaLinha.appendChild(acoes)
        tableBody.appendChild(novaLinha)
      }
    }
  })
}

function showDeleteModal(task: Task) {
  deleteModal?.showModal()
  const taskSpan = deleteModal?.querySelector('p > span') as HTMLElement
  taskSpan.innerText = task.description
  taskToDelete = task.documentId as string
}

listarTarefas()