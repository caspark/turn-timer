Turn Timer
==========

Tracks turn time in a 4 player (or less) game, intended to be used on a mobile device.

Usage
-----

Browse to http://caspark.github.io/turn-timer/ and you'll get a timer for 4 players, 20 minutes each.

The amount of time left per player is currently stored in the fragment in seconds, so you can do very basic configuration this way.

For example, to give 2 players 3 minutes, and the third player 60 seconds, and have no 4th player:

    http://caspark.github.io/turn-timer/#180,180,60,0

*Pro Tip:* increase your mobile device's screen timeout: JavaScript stops running if your browser goes to sleep and this implementation naively assumes that never happens ;)
