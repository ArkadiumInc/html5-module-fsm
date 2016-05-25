# html5-module-fsm

Implementation of simple finite state machine

Example of usage

    var FsmModule = require('../index.js');

    var FSMConstants = function()
    {
    };

    FSMConstants.StateNames = {
    	INIT_STATE: 'fsm.state.init',
    	GAMEPLAY_STATE: 'fsm.state.gameplay',
    	PAUSE_STATE: 'fsm.state.pause',
	UNKNOWN_STATE: 'unknown'
    };

    Object.freeze(FSMConstants.StateNames);
	
    var InitState = function(context) {
	FsmModule.FSMState.call(this, FSMConstants.StateNames.INIT_STATE, context);
    };	


    InitState.prototype = Object.create(FsmModule.FSMState.prototype);
    InitState.prototype.constructor = InitState;

    InitState.prototype.enter = function () {
    	'use strict';
        FsmModule.FSMState.prototype.enter.call(this);
	this._data.enterStateResult = this._name;
    };

    InitState.prototype.exit = function () {
    	'use strict';
        FsmModule.FSMState.prototype.exit.call(this);
	this._data.exitStateResult = this._name;
    };

    var GameplayState = function(context) {
    	'use strict';

	FsmModule.FSMState.call(this, FSMConstants.StateNames.GAMEPLAY_STATE, context);
    };	

    GameplayState.prototype = Object.create(FsmModule.FSMState.prototype);
    GameplayState.prototype.constructor = GameplayState;

    GameplayState.prototype.enter = function () {
    	'use strict';

        FsmModule.FSMState.prototype.enter.call(this);
	this._data.enterStateResult = this._name;
    };

    GameplayState.prototype.exit = function () {
    	'use strict';
        FsmModule.FSMState.prototype.exit.call(this);
	this._data.exitStateResult = this._name;
    };

    var PauseState = function(context) {
    	'use strict';

	FsmModule.FSMState.call(this, FSMConstants.StateNames.PAUSE_STATE, context);
    };	

    PauseState.prototype.exit = function () {
    	'use strict';
        FsmModule.FSMState.prototype.enter.call(this);
	this._data.exitStateResult = this._name;
    };

    PauseState.prototype = Object.create(FsmModule.FSMState.prototype);
    PauseState.prototype.constructor = PauseState;

    PauseState.prototype.enter = function () {
    	'use strict';

        FsmModule.FSMState.prototype.exit.call(this);
	this._data.enterStateResult = this._name;
    };
       
    var TestFSMConfig = function(context) {
    	'use strict';
	FsmModule.FSMConfiguration.call(this);

	var initState = new InitState(context);
	var gameplayState = new GameplayState(context);
	var pauseState = new PauseState(context);

	this.addState(initState);
	this.addState(gameplayState);
	this.addState(pauseState);
	this.setInitialState(initState);

	var transition = new FsmModule.FSMTransition(initState, gameplayState);
	this.addTransition(transition);
	transition = new FsmModule.FSMTransition(gameplayState, pauseState);
	this.addTransition(transition);
	transition = new FsmModule.FSMTransition(pauseState, gameplayState);
	this.addTransition(transition);
	transition = new FsmModule.FSMTransition(gameplayState, gameplayState);
	this.addTransition(transition);

    };
    TestFSMConfig.prototype = Object.create(FsmModule.FSMConfiguration.prototype);
    TestFSMConfig.prototype.constructor = TestFSMConfig;

    var currentSateContext = {enterStateResult : FSMConstants.StateNames.UNKNOWN_STATE, exitStateResult  : FSMConstants.StateNames.UNKNOWN_STATE};
    var fsm = fsmFactory.createFSM('testFSM', new TestFSMConfig(currentSateContext));
    
    fsm.goToState(FSMConstants.StateNames.GAMEPLAY_STATE);
