import type { FormState, BugRecord } from '@/type'


// const baseUrl = 'http://localhost:3011'
const baseUrl = 'https://hrsrive.cn/api'

const auth = localStorage.getItem('auth') || ""

const report = (data: FormState) => {
  // Send data to server
  return fetch(`${baseUrl}/bug`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

}

const getBugList = (payload: { emailList: string, page: number, amount: number, status: string } = {
  emailList: '',
  page: 1,
  amount: 10,
  status: ''
}) => {
  return fetch(`${baseUrl}/bug?emailList=${payload.emailList}&page=${payload.page}&amount=${payload.amount}&status=${payload.status}`, {
    method: 'GET',
    headers: {
      'Authorization': auth
    }
  })
    .then((response) => response.json())
}


const updateBug = (data: BugRecord) => {
  return fetch(`${baseUrl}/bug/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth
    },
    body: JSON.stringify(data),
  })
}

export { report, getBugList, updateBug }
