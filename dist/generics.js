"use strict";
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
function useState() {
    var state;
    function getState() {
        return state;
    }
    function setState(data) {
        state = data;
    }
    return { getState: getState, setState: setState };
}
var state = useState(); // use state accept just string by now
state.setState("Guilherme");
// state.setState(10)
var newState = useState(); // use state accept just string by now
newState.setState(10);
