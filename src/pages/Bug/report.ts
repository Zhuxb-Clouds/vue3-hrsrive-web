
export interface FormState {
  email: string;
  game: string;
  version?: string;
  bugType?: string;
  line?: string;
  content: string;
}

export interface BugRecord extends FormState {
  reply?: string;
  status?: string;
  id: number;
}

const auth = localStorage.getItem('auth') || ""

export const report = (data: FormState) => {
  // Send data to server
  return fetch('http://localhost:3011/bug', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

}

export const getBugList = (payload: { emailList: string, page: number, amount: number } = {
  emailList: '',
  page: 1,
  amount: 10
}) => {
  return fetch(`http://localhost:3011/bug?emailList=${payload.emailList}&page=${payload.page}&amount=${payload.amount}`, {
    method: 'GET',
    headers: {
      'Authorization': auth
    }
  })
    .then((response) => response.json())
}


export const updateBug = (data: BugRecord) => {
  return fetch(`http://localhost:3011/bug/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth
    },
    body: JSON.stringify(data),
  })
}

