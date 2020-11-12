const n1 = document.querySelector('#n1') as HTMLInputElement
const n2 = document.querySelector('#n2') as HTMLInputElement
const btn = document.querySelector('#btn-sum')!

function sum (n1: number, n2: number) {
  return n1 + n2
}

btn.addEventListener('click', () => {
  console.log(
    sum(Number(n1.value), Number(n2.value))
  )
})