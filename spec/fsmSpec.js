describe("FSM module tests", function() {
    'use strict';
    var FsmModule = require('../index.js');
	
    var InitState = function() {
	FsmModule.FSMState.call(this);
    };	

    var currentSateContext = {currentState : 'unknown'};

    InitState.prototype = Object.create(FsmModule.FSMState.prototype);
    InitState.prototype.constructor = InitState;

    InitState.prototype.enter = function () {
    	'use strict';
        FsmModule.FSMState.prototype.enter.call(this, 'fsm.state.init');
    };

    var GameplayState = function() {
    	'use strict';

	FsmModule.FSMState.call(this, 'fsm.state.gameplay');
    };	

    GameplayState.prototype = Object.create(FsmModule.FSMState.prototype);
    GameplayState.prototype.constructor = GameplayState;

    GameplayState.prototype.enter = function () {
    	'use strict';

        FsmModule.FSMState.prototype.enter.call(this);
    };

    var PauseState = function() {
    	'use strict';

	FsmModule.FSMState.call(this, 'fsm.state.pause');
    };	

    PauseState.prototype = Object.create(FsmModule.FSMState.prototype);
    PauseState.prototype.constructor = PauseState;

    PauseState.prototype.enter = function () {
    	'use strict';

        FsmModule.FSMState.prototype.enter.call(this);
    };
       
    var TestFSMConfig = function() {
    	'use strict';
	FsmModule.FSMConfiguration.call(this);

	var initState = new InitState();
	var gameplayState = new GameplayState();
	var pauseState = new PauseState();

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

    var fsmFactory = new FsmModule.FSMFactory();

    var fsm = null;

    beforeEach(function() {
    	'use strict';
	fsm = fsmFactory.createFSM('testFSM', new TestFSMConfig());
    });

    afterEach(function() {
    	'use strict';
        fsm = null;
    });

    it("Test FSM definition", function() {
        expect(fsm).not.toBe(null);
    });

    it("Test FSM switch to correct state 1", function() {

        var switchStateCorrectly = function() {
	    'use strict';

            fsm.goToState('fsm.state.gameplay');
        };

        var switchStateCorrectly1 = function() {
	    'use strict';

            fsm.goToState('fsm.state.pause');
        };

        expect(switchStateCorrectly).not.toThrow();
	expect(switchStateCorrectly).not.toThrow();

        expect(switchStateCorrectly1).not.toThrow();
	expect(switchStateCorrectly1).toThrow();

    });

});
