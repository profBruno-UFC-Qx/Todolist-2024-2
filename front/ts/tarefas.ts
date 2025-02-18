const authorizationHeader =  {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
}

class TaskManager {

  async getAll(): Promise<StrapiResponse<Task>> {
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
  
  async create(task: Task): Promise<StrapiResponseSingle<Task>> {
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
  
  async getById(id: string): Promise<StrapiResponseSingle<Task>> {
    const res = await api.get(`/tasks/${id}`, authorizationHeader)
    return res.data
  }
  
  async delete(task: Task): Promise<Task> {
    await api.delete(`/tasks/${task.documentId}`, authorizationHeader)
    return task
  }
  
  async update(task: Task): Promise<StrapiResponseSingle<Task>> {
    const res = await api.put(`/tasks/${task.documentId}`, {
      data: {
        description: task.description
      }
    }, authorizationHeader)
    return res.data
  }
}

