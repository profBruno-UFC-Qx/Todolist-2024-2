interface Task {
  documentId: string,
  description: string,
  done: boolean,
  deadline: string,
}

async function getAll(): Promise<Task[]> {
  const res = await api.get('/tasks/')
  return res.data.data
}