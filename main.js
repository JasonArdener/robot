$(document).ready(function() {
    // Store the positions of where scents are left.
    var scents = new Array();

    // Run inputs.
    runRobot("5,3", "1 1 E", "RFRFRFRF");
    runRobot("5,3", "3 2 N", "FRRFLLFFRRFLL");
    runRobot("5,3", "0 3 W", "LLFFFLFLFL");

    /**
     * Calculate final position of robot.
     * @param   {[String]} ur           [Upper right coordinate.]
     * @param   {[String]} p            [Starting position.]
     * @param   {[String]} pa           [Command string.]
     * @var     {[String]} lowerLeft    [Lower left coordinate. May be needed in future.]
     * @var     {[Int]} w               [Width of grid.]
     * @var     {[Int]} h               [Height of grid.]
     * @var     {[Int]} x               [Current x position of robot.]
     * @var     {[Int]} y               [Current y position of robot.]
     * @var     {[Int]} o               [Orientation.]
     * @var     {[String]} output       [Output string.]
     */
    function runRobot(ur, p, pa) {
        var lowerLeft = "0,0";

        var splitter = ur.split(',');

        var w = parseInt(splitter[0], 10);
        var h = parseInt(splitter[1], 10);

        splitter = p.split(' ');

        var x = parseInt(splitter[0], 10);
        var y = parseInt(splitter[1], 10);
        var o = splitter[2];

        var ori = new Array("N", "E", "S", "W");

        var output;

        faceDirection(ori, o);

        // Calculates the initial orientation string with current orientation first.
        function faceDirection(array,d) {
          var idx = (typeof d === "string") ? array.indexOf(d) : d % array.length;
          ori = array.slice(idx).concat(array.slice(0,idx));
        }

        var cmds = pa.split('');

        // Loop through each command in the command string. Adjust the orientation string accordingly, or call move funtion.
        $.each(cmds, function(key, value) {
            switch(value) {
                case "L":
                    ori.unshift(ori.pop());
                    break;
                case "R":
                    ori.push(ori.shift());
                    break;
                case "F":
                    // Break out of each loop if LOST.
                    if (move(ori[0]) === 0) {
                        return false;
                    }
                    break;
            }
        });

        // Check direction to move in. Check if the 'cell' is marked with a scent, if it is and it will be lost if moves forward, ignore F command.
        function move(dir) {
            var i;
            switch(dir) {
                case "N":
                    i = y+1;
                    if (scents.indexOf(x+","+y)>-1 && i>h) {
                        return;
                    } else if (i>h) {
                        scents.push(x+","+y); return 0;
                    }
                    y++;
                    break;
                case "E":
                    i = x+1;
                    if (scents.indexOf(x+","+y)>-1 && i>w) {
                        return;
                    } else if (i>w) {
                        scents.push(x+","+y); return 0;
                    }
                    x++;
                    break;
                case "S":
                    i = y-1;
                    if (scents.indexOf(x+","+y)>-1 && i<0) {
                        return;
                    } else if (i<0) {
                        scents.push(x+","+y); return 0;
                    }
                    y--;
                    break;
                case "W":
                    i = x-1;
                    if (scents.indexOf(x+","+y)>-1 && i<0) {
                        return;
                    } else if (i<0) {
                        scents.push(x+","+y); return 0;
                    }
                    x--;
                    break;
            }
        }

        // Create and output an output string.
        output = x + " " + y + " " + ori[0];
        if (scents.length > 0) { output = output + " LOST";}

        $('#main').append("<p>Grid Size: " + ur + "</p>");
        $('#main').append("<p>Starting Position: " + p + "</p>");
        $('#main').append("<p>Movement String: " + pa + "</p>");
        $('#main').append("<p>Final Position: " + output + "</p>");
        $('#main').append("<p>------------------------------------</p>");
    }
});