$(function() {
    var startTime = 20 * 60 * 1000, // in ms
        players = [
            {
                name: 'Duck',
                time: startTime
            },
            {
                name: 'Crash',
                time: startTime
            },
            {
                name: 'Hand',
                time: startTime
            },
            {
                name: 'Spoon',
                time: startTime
            }
        ],
        active = -1,
        body = $('body'),
        tickDelay = 1000, // in ms
        lastTime;

    function setup() {
        if (window.location.hash) {
            restoreStateFromString(window.location.hash.substring(1));
        }

        $.each(players, function(i, player) {
            var playerDiv = $('<div id=player-"' + i  + '" class="player toggle-button">');
            var nameDiv = $('<p class="player-name">');
            var timeDiv = $('<p class="player-time">');
            playerDiv.append(nameDiv).append(timeDiv);
            playerDiv.click(function() {
                if (players[i].time > 0) {
                    console.debug('Active player is now', players[i]);
                    active = i;
                    render();
                }
            });
            body.append(playerDiv);
        });
        $('<div id="pause" class="toggle-button">').click(function() {
            if (active != -1) {
                console.debug("Pausing");
                active = -1;
                render();
            }
        }).text('Pause').appendTo(body);
    }

    function render() {
        var playerDivs = $('.player'),
            pauseDiv = $('#pause');
        playerDivs.removeClass('current interactable');
        playerDivs.each(function(i, playerElement) {
            var playerDiv = $(playerElement),
                playerMinutes = Math.floor(players[i].time / 1000 / 60)
                playerSeconds = Math.floor((players[i].time / 1000) % 60)
            if (i == active) {
                playerDiv.addClass('current'); 
            } else if (players[i].time > 0) {
                playerDiv.addClass('interactable');
            } else {
                playerDiv.addClass('deceased');
            }
            playerDiv.find('.player-name').text(players[i].name);
            playerDiv.find('.player-time').text(playerMinutes + 'm ' + playerSeconds + 's');
        })
        if (active == -1) {
            pauseDiv.addClass('current');
            pauseDiv.text('Paused');
            pauseDiv.removeClass('interactable');
        } else {
            pauseDiv.removeClass('current');
            pauseDiv.text('Pause');
            pauseDiv.addClass('interactable');
        }
    }

    function update() {
        if (active >= 0) {
            players[active].time = Math.max(players[active].time - tickDelay, 0);
            if (players[active].time == 0) {
                active = -1;
            }
        }
        window.location.hash = '#' + saveStateAsString();
    }

    /* Returns the current timer state as a string */
    function saveStateAsString() {
        var str = "";
        $.each(players, function(i, player) {
            if (str.length > 0) {
                str = str + ",";
            }
            str = str + (player.time / 1000);
        });
        return str;
    }

    /* Restores the current timer state from the given string */
    function restoreStateFromString(state) {
        $.each(state.split(','), function(i, playerTime) {
            players[i].time = parseInt(playerTime) * 1000;
        });
    }

    setup();
    render();
    setInterval(function() {
        update();
        render();
    }, tickDelay);
})
