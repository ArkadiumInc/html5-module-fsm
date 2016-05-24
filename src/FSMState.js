/**
 * Created by jedi on 08-Feb-16.
 */

var FSMState = function(name, data) {
    'use strict';
    this._name = name;
    this._fsm = null;
    this._data = data;
};

FSMState.prototype = {
};

FSMState.prototype.constructor = FSMState;

FSMState.prototype.getName = function () {
    'use strict';
    return this._name;
};

FSMState.prototype.getFSM = function () {
    'use strict';
    return this._fsm;
};

FSMState.prototype.setFSM = function (fsm) {
    'use strict';
    this._fsm = fsm;
};

FSMState.prototype.getData = function () {
    'use strict';
    return this._data;
};

FSMState.prototype.setData = function (data) {
    'use strict';
    this._fsm = data;
};

FSMState.prototype.enter = function () {
    'use strict';
};

FSMState.prototype.exit = function () {
    'use strict';
};

FSMState.prototype.dispose = function () {
    'use strict';
    this._fsm = null;
    this._data = null;
};

module.exports = FSMState;