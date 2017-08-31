$(document).ready(function() {

    var crystalCollector = {

        // create game variables
        totalWins: 0,
        totalLosses: 0,
        targetNumber: -1,
        currentTotal: -1,

        crystals: {
            crystal1: { value: -1, htmlTarget: '#buttonCrystal1' },
            crystal2: { value: -1, htmlTarget: '#buttonCrystal2' },
            crystal3: { value: -1, htmlTarget: '#buttonCrystal3' },
            crystal4: { value: -1, htmlTarget: '#buttonCrystal4' }
        },

        // function to set target number, current, and crystal values
        initializeGame: function () {
            // set number between 19 and 120, set current to 0
            this.targetNumber = Math.floor((Math.random() * 101) + 19);
            this.currentTotal = 0;

            // set values for crystals
            // get array of keys
            var objKeys = Object.keys(this.crystals);
            // loop through each key and set the values
            for (var i = 0; i < 4; i++) {
                // generate random number from 1 to 12
                var crystalValue = Math.floor(Math.random() * 11 + 1);
                // set html target based on current key
                var targetCrystal = this.crystals[objKeys[i]].htmlTarget;
                // set value and data-value
                this.crystals[objKeys[i]].value = crystalValue;
                $(targetCrystal).attr('data-value', crystalValue);
            }

            this.updateGameBoard();
        },

        // function to update the game board display
        updateGameBoard: function () {
            // update numbers regardless of win/loss
            $('#spanTarget').html(this.targetNumber);
            $('#spanCurrent').html(this.currentTotal);

            // check for win/loss and reset game
            if (this.currentTotal === this.targetNumber) {
                this.totalWins++;
                this.initializeGame();
            }
            else if (this.currentTotal > this.targetNumber) {
                this.totalLosses++;
                this.initializeGame();
            }

            $('#spanWins').html(this.totalWins);
            $('#spanLosses').html(this.totalLosses);

        },

        //function to add value to current total
        addValue: function (pValue) {
            this.currentTotal = this.currentTotal + parseInt(pValue);
            this.updateGameBoard();
        }
    };

    crystalCollector.initializeGame();

    $('.crystal').on('click', function () {
        crystalCollector.addValue($(this).attr('data-value'));
    })
});