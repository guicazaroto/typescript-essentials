type user = {
  id: number | string;
  name: string;
  email?: string;
}

type transactions = {
  amount: number;
  date: string;
  to: number;
}

type reciept = user & transactions

const user: user = {
  id: 1,
  name: 'Julio'
}

const transactions: transactions = {
  amount: 100,
  date: '2020-10-01',
  to: 432456
}

const rec: reciept = {
  id: 1,
  name: 'Guilherme',
  amount: 100,
  date: '2020-10-10',
  to: 3245
}