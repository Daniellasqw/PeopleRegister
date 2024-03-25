export interface ItypeTitles {
  title?: string;
  subtitle?: string;
  sizetitle?: number;
  sizeSubtitle?: number;
}

export interface OnchangeType {
  onChangeScreen?: (name: string) => void;
  onChangeForm?: (value: string) => void;
  screen?:string;
}

export interface FormData {
  id?: number;
  name?: string;
  email?: string;
  fantasyName?: string;
  reasonSocial?: string;
  cnpj?: string;
  stateRegistration?: string;
  address?: string;
  phoneNumber?: string;
  responsible?: string;
  responsibleCPF?: string;
  responsiblePhoneNumber?: string;
  type?: string;
  cpf?: string;
}

export interface ButtomCustomNext {
  value: number;
  setNext: (value: number) => void;
}

