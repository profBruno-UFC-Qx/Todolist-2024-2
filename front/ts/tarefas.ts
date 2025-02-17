async function getAll(): Promise<StrapiResponse<Task>> {
  const res = await api.get('/tasks?populate=category')
  return res.data
}

async function createTask(task: Task): Promise<StrapiResponsePost<Task>> {
  console.log(task)
  const res = await api.post('/tasks/', {
    data: {
      description: task.description,
      category: task.category.documentId,
      done: task.done,
      deadline: task.deadline
    }
  })
 return res
}

async function deleteTask(id: string) {
  const res = await api.delete(`/tasks/${id}`)
  return res.data
}