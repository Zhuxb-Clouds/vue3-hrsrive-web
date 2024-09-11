interface FormState {
  email: string;
  game: string;
  version?: string;
  bugType?: string;
  line?: string;
  content: string;
}

interface BugRecord extends FormState {
  reply?: string;
  status?: string;
  id: number;
}

export { FormState, BugRecord }
