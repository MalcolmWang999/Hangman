
/* Malcolm Wang
Apr 2018 ~ Jun 2018
ICS3U JS Project: Hangman
This is a JS file to run functions for index.html
*/

// Funtion to initialize and create canvas
canvas = function () {

    myHangman = document.getElementById("hangman"); // get hangman element
    context = myHangman.getContext('2d'); // get 2d context
    context.beginPath();
    context.lineWidth = 2;

};
    
// Funtion to draw hangman's head
head = function () {

    myHangman = document.getElementById("hangman");
    context = myHangman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true); // draw circle
    context.stroke();

};

// Funtion to draw lines
draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();

};

// functions to draw the parts of the hangman
frame1 = function () {
    draw(0, 150, 150, 150);
};

frame2 = function () {
    draw(10, 0, 10, 600);
};

frame3 = function () {
    draw(0, 5, 70, 5);
};

frame4 = function () {
    draw(60, 5, 60, 15);
};

torso = function () {
    draw(60, 36, 60, 70);
};

rightArm = function () {
    draw(60, 46, 100, 50);
};

leftArm = function () {
    draw(60, 46, 20, 50);
};

rightLeg = function () {
    draw(60, 70, 100, 100);
};

leftLeg = function () {
    draw(60, 70, 20, 100);
};

// funtion to draw the hangman
drawHangman = function () {
    
    head();
    frame1();
    frame2();
    frame3();
    frame4();
    torso();
    rightArm();
    leftArm();
    rightLeg();
    leftLeg();
    
};

drawHangman();