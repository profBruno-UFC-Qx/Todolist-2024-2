const form = document.getElementById('form')
const addButton = document.getElementById('addTask')
const formDescricao = document.getElementById('descricao') as HTMLInputElement
const deadlineInput = document.getElementById('data') as HTMLInputElement
const selectCategory = document.getElementById("categorias") as HTMLSelectElement
const deleteModal = document.getElementById('deleteModal') as HTMLDialogElement
const editModal = document.getElementById('editModal') as HTMLDialogElement
const cancelButton = document.getElementById('cancelButton')
const deleteButton = document.getElementById('deleteButton')
const editDescriptionDialog = document.getElementById('editDescription') as HTMLInputElement
const editButton = document.getElementById('editButton')  as HTMLButtonElement
let taskToDelete: string;
let taskToEdit: string

editButton?.addEventListener('click', async () => {
  console.log(`Atualizando a tarefa ${taskToEdit}`)
  await updateTask(taskToEdit, editDescriptionDialog.value)
  mostrarTarefas()
})

deleteButton?.addEventListener('click', async () => {
  await deleteTask(taskToDelete)
  mostrarTarefas()
  deleteModal.close()
})

formDescricao?.addEventListener('input', () => {
  if(formDescricao.value) {
    addButton?.removeAttribute('disabled')
  } else {
    addButton?.setAttribute('disabled', 'disabled')
  }
})


form?.addEventListener('submit', async (e) => {
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
  await createTask(task)
  mostrarTarefas()
})

async function mostrarTarefas() {
  const res =  await getAll();
  const tableBody = document.getElementById("tarefas")
  if(tableBody) {
    tableBody.innerHTML = ''
    for(let task of res.data) {
      const novaLinha = document.createElement('tr')

      const description = document.createElement('td')
      description.setAttribute('colspan', '2');
      description.innerText = task.description

      const category = document.createElement('td')
      const spanCategory = createCategorLabel(task.category.description)
      category.appendChild(spanCategory)

      const deadline = document.createElement('td')
      deadline.innerText = task.deadline || ''

      const acoes = createAcoes(task)
      

      novaLinha.appendChild(description)
      novaLinha.appendChild(category)
      novaLinha.appendChild(deadline)
      novaLinha.appendChild(acoes)
      tableBody.appendChild(novaLinha)
    }
  }

}

function createOption({ documentId, description}: Category): HTMLOptionElement {
  const option = document.createElement('option')
  option.value = documentId
  option.innerText = description
  return option
}

function createCategorLabel(description: string): HTMLSpanElement {
  const spanCategory = document.createElement('span')
  spanCategory.innerText = description
  spanCategory.classList.add('category')
  spanCategory.classList.add(description.toLocaleLowerCase())
  return spanCategory
}

function createDeleteButton(task: Task): HTMLButtonElement {
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
 

  return deleteButton
}

function createEditButton(task: Task): HTMLButtonElement {
  const editButton = document.createElement('button')
  editButton.className = 'edit-button'
  editButton.addEventListener('click', () => {
    taskToEdit = task.documentId as string
    editDescriptionDialog.value = task.description
    editModal.showModal()
  })

  const icon = document.createElement('i')
  icon.className = 'bi bi-pencil'
  editButton.appendChild(icon)
 
  return editButton
}

function createAcoes(task: Task): HTMLTableCellElement {
  const acoes = document.createElement('td')
  
  const deleteButton = createDeleteButton(task)
  acoes.appendChild(deleteButton)

  const editButton = createEditButton(task)
  acoes.appendChild(editButton)

  return acoes
}


function showDeleteModal(task: Task) {
  deleteModal?.showModal()
  const taskSpan = deleteModal?.querySelector('p > span') as HTMLElement
  taskSpan.innerText = task.description
  taskToDelete = task.documentId as string
}


window.addEventListener('load', async () => {

  const res = await getAllCategory()
  for(let categoria of res.data) {
    const option = createOption(categoria)
    selectCategory?.appendChild(option)
  }
  mostrarTarefas()
 
});