$(function() {

	var user = {
		lastInput: '', 
		responseIndex: 0
	};

	var StateScheme = function ( user ) {

		var parseInput = function ( input ) {
			return true;	
		};

		var validateResponse = function ( input, validInputs ) {
			var pInput = parseInput(input);	
			for(var i = 0; i < validInputs.length; i++) {
				if ( pInput === validInputs[i] ) {
					return true;	
				}
			}
			return false;
		};
		
		this.userResponse = function( response ) {
			user.lastInput = response;
			var t = user.currentState.fetchResponse();
			return t;
		}

		// This object is a state
		this.start = {
			
			// an array of computer responses (ordered) with the list of possible values. This may mature with age as I figure out a better way to approve responses
			// *** Idea: Add in the ability to branch off and display child responses responses (ordered)
			response : [ 
				{
					'validResponse' :'fist response',
					'approvedInputs' : ['yes', 'y', true],
					'invaldResponse' : []

				},
				{
					'validResponse' :'second response',
					'approvedInputs' : ['yes', 'y', true],
					'invalidResponse' : []

				}
			],

			fetchResponse : function () {
				if( user.responseIndex < this.response.length) {
					var responseResults = validateResponse( user.lastInput, this.response[user.responseIndex].approvedInputs );
					
					if( responseResults ) {
						user.responseIndex = user.responseIndex + 1;
						return this.response[user.responseIndex - 1].validResponse + '\n';
					} else {
						return 'Incorrect Response\n';   
					}
				} else {
					// change location	
					return 'NO MORE\n';
				}
			}

		};
		
		
		// some 'constructing
		if ( !user.currentState ) {
			user.currentState = this.start;
		}
	};


	var currentHandler = new StateScheme(user);
	$('#history').html('');
	
	$('#submitMe').click( function() {
		var textInput = $('#user-input');
		var cons = $('#history');
		
		
		cons.append('User: ' + textInput.val() + '\n');
		cons.append('Computer: ' + currentHandler.userResponse(textInput.val()));
		
		textInput.val('');
		textInput.focus();
	});
	
});