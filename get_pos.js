var robot = require("robotjs");

while (1)
{
	mouse = robot.getMousePos();
	console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
}
