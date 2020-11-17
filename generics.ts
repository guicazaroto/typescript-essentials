// S => state
// T => type
// K => key
// E => element
// V => Value

/* 
  useState recebe um tipo de dinâmico S, que poderá ser number ou string,
  porém a partir do momento que for passado um desses dois tipos, permanecerá
  sendo o primeiro tipo passado.
  Repare que por default aceita somente number ( = number)
*/

function useState< S extends number | string = number > () {
  let state: S

  function getState () {
    return state
  }

  function setState (data: S) {
    state = data
  }

  return { getState, setState }
}

const state = useState<string>() // use state accept just string by now
state.setState("Guilherme")
state.setState(10)

const newState = useState() // use state accept just string by now
newState.setState(10)