describe("FSM module tests", function() {
    'use strict';
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

    var TestFSMConfigWrongStates = function(context) {
    	'use strict';
	FsmModule.FSMConfiguration.call(this);

	var initState = new InitState(context);
	var gameplayState = new GameplayState(context);

	this.addState(initState);
	this.addState(initState);
	this.addState(gameplayState);
	this.setInitialState(initState);

	var transition = new FsmModule.FSMTransition(initState, gameplayState);
	this.addTransition(transition);
    };
    TestFSMConfigWrongStates.prototype = Object.create(FsmModule.FSMConfiguration.prototype);
    TestFSMConfigWrongStates.prototype.constructor = TestFSMConfigWrongStates;

    var TestFSMConfigWrongTransitions = function(context) {
    	'use strict';
	FsmModule.FSMConfiguration.call(this);

	var initState = new InitState(context);
	var gameplayState = new GameplayState(context);
	var pauseState = new PauseState(context);

	this.addState(initState);
	this.addState(gameplayState);
	this.addState(pauseState);

	this.setInitialState(initState);
    };

    TestFSMConfigWrongTransitions.prototype = Object.create(FsmModule.FSMConfiguration.prototype);
    TestFSMConfigWrongTransitions.prototype.constructor = TestFSMConfigWrongTransitions;

    var fsmFactory = new FsmModule.FSMFactory();

    var fsm = null;
    var currentSateContext = null;

    beforeEach(function() {
    	'use strict';
	currentSateContext = {enterStateResult : FSMConstants.StateNames.UNKNOWN_STATE, exitStateResult  : FSMConstants.StateNames.UNKNOWN_STATE};
	fsm = fsmFactory.createFSM('testFSM', new TestFSMConfig(currentSateContext));
    });

    afterEach(function() {
    	'use strict';
        fsm = null;
    });

    it("Test FSM definition", function() {
        expect(fsm).not.toBe(null);
    });

    it("Test FSM switch to correct state 1", function() {

        var switchStateCorrectlyFromInitToGameplay = function() {
	    'use strict';
	    expect(currentSateContext.enterStateResult).toEqual(FSMConstants.StateNames.INIT_STATE);
	    expect(currentSateContext.exitStateResult).toEqual(FSMConstants.StateNames.UNKNOWN_STATE);

            fsm.goToState(FSMConstants.StateNames.GAMEPLAY_STATE);

	    expect(currentSateContext.enterStateResult).toEqual(FSMConstants.StateNames.GAMEPLAY_STATE);
	    expect(currentSateContext.exitStateResult).toEqual(FSMConstants.StateNames.INIT_STATE);

        };

        var switchStateCorrectlyFromGameplayToGameplay = function() {
	    'use strict';

	    expect(currentSateContext.enterStateResult).toEqual(FSMConstants.StateNames.GAMEPLAY_STATE);
	    expect(currentSateContext.exitStateResult).toEqual(FSMConstants.StateNames.INIT_STATE);

            fsm.goToState(FSMConstants.StateNames.GAMEPLAY_STATE);

	    expect(currentSateContext.enterStateResult).toEqual(FSMConstants.StateNames.GAMEPLAY_STATE);
	    expect(currentSateContext.exitStateResult).toEqual(FSMConstants.StateNames.GAMEPLAY_STATE);
        };

        var switchStateCorrectly1 = function() {
	    'use strict';

            fsm.goToState(FSMConstants.StateNames.PAUSE_STATE);
        };

        expect(switchStateCorrectlyFromInitToGameplay).not.toThrow();
	expect(switchStateCorrectlyFromGameplayToGameplay).not.toThrow();

        expect(switchStateCorrectly1).not.toThrow();
	expect(switchStateCorrectly1).toThrow();

    });

    it("Test FSM switch to incorrect state ", function() {

        var switchStateIncorrectly = function() {
	    'use strict';

            fsm.goToState('---wrong state---');
        };


        expect(switchStateIncorrectly).toThrow();

    });

    it("Test FSM check of incorrect states", function() {
        var checkFSMCreationWithIncorrectStates = function() {
	    'use strict';
            var fsm1 = fsmFactory.createFSM('testFSM1', new TestFSMConfigWrongStates(currentSateContext));
        };

        expect(checkFSMCreationWithIncorrectStates).toThrow();

    });

    it("Test FSM check of incorrect transitions", function() {
        var checkFSMCreationWithIncorrectTransitions = function() {
	    'use strict';
            var fsm1 = fsmFactory.createFSM('testFSM1', new TestFSMConfigWrongTransitions(currentSateContext));
        };

        expect(checkFSMCreationWithIncorrectTransitions).toThrow();

    });

});
