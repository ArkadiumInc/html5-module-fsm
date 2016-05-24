/**
 * Created by jedi on 11-Feb-16.
 */

var FSMTransition = function(from, to) {
    'use strict';
    this._from  = from;
    this._to = to;
};

FSMTransition.prototype = {
};

FSMTransition.prototype.constructor = FSMTransition;

FSMTransition.prototype.getFrom = function () {
    'use strict';
    return this._from;
};

FSMTransition.prototype.getTo = function () {
    'use strict';
    return this._to;
};

module.exports = FSMTransition;