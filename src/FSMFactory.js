/**
 * Created by jedi on 12-Feb-16.
 */
var FSM  = require('./FSM');

var FSMFactory = function() {
    'use strict';
};

FSMFactory.prototype = {
};

FSMFactory.prototype.constructor = FSMFactory;

FSMFactory.prototype.createFSM = function (name, config) {
    'use strict';
    var fsm = new FSM(name);
    fsm.initialize(config);
    return fsm;
};

module.exports = FSMFactory;