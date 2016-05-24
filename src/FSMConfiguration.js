/**
 * Created by jedi on 11-Feb-16.
 */

var FSMConfiguration = function() {
    'use strict';
    this._states  = [];
    this._transitions = [];
    this._initialState = null;
};

FSMConfiguration.prototype = {
};

FSMConfiguration.prototype.constructor = FSMConfiguration;

FSMConfiguration.prototype.getStates = function () {
    'use strict';
    return this._states;
};

FSMConfiguration.prototype.getTransitions = function () {
    'use strict';
    return this._transitions;
};

FSMConfiguration.prototype.getInitialState = function () {
    'use strict';
    return this._initialState;
};

FSMConfiguration.prototype.addState = function (state) {
    'use strict';
    this._states.push(state);
};

FSMConfiguration.prototype.addTransition = function (transition) {
    'use strict';
    this._transitions.push(transition);
};

FSMConfiguration.prototype.setInitialState = function (state) {
    'use strict';
    this._initialState = state;
};

FSMConfiguration.prototype.validate = function () {
    'use strict';
    if(this._states.length <= 1)
    {
        throw new Error('You need to add at least 2 state');
    }
    else
    {
        for(var i = 0; i < this._states.length; ++i)
        {
            for(var j = 0; j < this._states.length; ++j)
            {
                if(i !== j)
                {
                    var s1 = this._states[i];
                    var s2 = this._states[j];
                    if(s1 === null || s2 === null)
                    {
                        throw new Error('State can not be null');
                    }
                    if(s1.getName() === s2.getName())
                    {
                        throw new Error('Duplication of state '+s1.getName());
                    }
                }
            }
        }
        if(this._transitions.length === 0)
        {
            throw new Error('You need to add at least one transition');
        }

        for(var k = 0; k < this._transitions.length; ++k)
        {
            var t = this._transitions[k];
            if(t.from === null || t.to === null)
            {
                throw new Error('Transition can not contain null as state');
            }

            var fromStateDetected = false;
            var toStateDetected = false;

            var state = null;
            for(i = 0; i < this._states.length; ++i)
            {
                state = this._states[i];
                if(t.getFrom() === state)
                {
                    fromStateDetected = true;
                }
                if(t.getTo() === state)
                {
                    toStateDetected = true;
                }
            }
            if(!fromStateDetected || !toStateDetected)
            {
                throw new Error('Transition from ' + t.getFrom().getName() + ' state to ' + t.getTo().getName() + ' state contains unknown ' + (fromStateDetected ? '\'to\'' : '\'from\'') + state.getName());
            }
        }
    }
};

module.exports = FSMConfiguration;