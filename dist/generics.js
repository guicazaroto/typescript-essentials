"use strict";
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
var state = useState();
state.setState(10);
console.log('state', state.getState());
