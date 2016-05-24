/**
 * Created by jedi on 12-Feb-16.
 */

var FSM = function(name) {
    'use strict';
    this._name = name;
    this._currentState = null;
    this._states = {};
    this._transitions = {};
    this._initialState = null;
};

FSM.prototype = {
};

FSM.prototype.constructor = FSM;

FSM.prototype.getCurrentState = function () {
    'use strict';
    return this._currentState;
};

FSM.prototype.initialize = function (config) {
    'use strict';
    config.validate();
    var states = config.getStates();
    for(var i = 0; i < states.length; ++i)
    {
        this._states[states[i].getName()] = states[i];
        states[i].setFSM(this);
    }

    var transitions = config.getTransitions();

    for(var j = 0; j < transitions.length; ++j)
    {
        var t = transitions[j];
        this._transitions[this.getKeyForTransition(t.getFrom().getName(), t.getTo().getName())] = t;
    }
    this._initialState = config.getInitialState();
    this._currentState = this._initialState;
    this._currentState.enter();
};

FSM.prototype.goToState = function (stateName)
{
    'use strict';
    var newState = this.getStateByName(stateName);
    if(newState === null)
    {
        throw new Error('State ' + stateName + ' did not registred in FSM(' + this._name + ')');
    }
    var t = this._transitions[this.getKeyForTransition(this._currentState.getName(), newState.getName())];
    var isTransitionValid = (t !== null && t !== undefined);
    if(isTransitionValid)
    {
        this._currentState.exit();
        this._currentState = newState;
        this._currentState.enter();
        return newState;
    }
    else
    {
        throw new Error('Wrong transition from state ' + this._currentState.getName() + ' to state ' + newState.getName() + ' in FSM(' + this._name + ')');
    }
};

FSM.prototype.dispose = function () {
    'use strict';
    for(var state in this._states)
    {
        this._states[state].dispose();
    }
};

FSM.prototype.getKeyForTransition = function (fromName, toName)
{
    'use strict';
    return 'from ' + fromName + ' to ' + toName;
};

FSM.prototype.getStateByName = function (stateName)
{
    'use strict';
    return this._states[stateName];
};

module.exports = FSM;