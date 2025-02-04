const api = axios.create({
  baseURL: 'http://localhost:1337/api',
  timeout: 1000,
});

async function getAll() {
  const res = await api.get('/tasks/')
  return res.data.data
}

getAll().then(tasks => {
  console.log(tasks)
  
  const tableBody = document.getElementById("tarefas")
  for(let task of tasks) {
    tableBody.innerHTML += `<tr><td>${task.description}</td><td></td></td><td></td></tr>`
  }
})