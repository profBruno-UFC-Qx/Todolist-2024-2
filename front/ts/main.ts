getAll().then(tasks => {
  console.log(tasks)
  
  const tableBody = document.getElementById("tarefas")
  if(tableBody) {
    for(let task of tasks) {
      const novaLinha = document.createElement('tr')

      const description = document.createElement('td')
      description.setAttribute('colspan', '2');
      description.innerText = task.description

      const category = document.createElement('td')
      const spanCategory = document.createElement('span')
      spanCategory.innerText = 'lazer'
      spanCategory.classList.add('category')
      spanCategory.classList.add('lazer')
      category.appendChild(spanCategory)

      const deadline = document.createElement('td')
      deadline.innerText = task.deadline

      const acoes = document.createElement('td')

      novaLinha.appendChild(description)
      novaLinha.appendChild(category)
      novaLinha.appendChild(deadline)
      novaLinha.appendChild(acoes)
      tableBody.appendChild(novaLinha)
    }
  }
})