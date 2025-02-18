const authorizationHeader =  {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}

async function getAll(): Promise<StrapiResponse<Task>> {
  const res = await api.get('/tasks', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    params: {
      populate: 'category',
      "filters[user][$eq]": localStorage.getItem('id')
    }
  })
  return res.data
}

async function createTask(task: Task): Promise<StrapiResponsePost<Task>> {
  console.log(task)
  const res = await api.post('/tasks/', {
    data: {
      description: task.description,
      category: task.category.documentId,
      done: task.done,
      deadline: task.deadline,
      user: localStorage.getItem('documentId')
    }
  }, authorizationHeader)
 return res
}

async function getTask(id: string): Promise<StrapiResponse<Task>> {
  const res = await api.get(`/tasks/${id}`, authorizationHeader)
  return res.data
}

async function deleteTask(id: string) {
  const res = await api.delete(`/tasks/${id}`, authorizationHeader)
  return res.data
}

async function updateTask(id: string, description: string) {
  const res = await api.put(`/tasks/${id}`, {
    data: {
      description
    }
  }, authorizationHeader)
  return res.data
}