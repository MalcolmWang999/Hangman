
/* Malcolm Wang
Apr 2018 ~ Jun 2018
ICS3U JS Project: Hangman
This is a JS file to run functions for gameCore.html
 */

// function to load window
window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z']; // alphabet array for buttons

    // Word Database
    var easyWords = ["cat", "dog", "pop", "snake", "good", "bad", "sad", "pig", "angry", "net", "farm", "hit", "in",
        "out", "fat", "thin", "for", "at", "with", "or", "and", "rock", "land", "earth", "rat", "mouse",
        "mother", "father", "aunt", "uncle", "roll", "what", "hat", "art", "test", "car", "pet", "place",
        "paper", "adult", "baby", "touch", "flip", "block", "check", "well", "fine", "fun", "green",
        "grass", "glass", "red", "blue", "black", "purple", "yellow", "white", "grey", "pink", "look",
        "please", "let", "run", "jump", "walk", "night", "moon", "noon", "sun", "son", "house", "horse",
        "cook", "cock", "duck", "goose", "ship", "sheep", "lamb", "cow", "wool", "wolf", "rabbit", "keep",
        "cut", "break", "call", "enter", "sit", "step", "stairs", "track", "train", "smart", "like", "buy",
        "pick", "bill", "cash", "cost", "book", "note", "photo", "phone", "word", "man", "woman", "day",
        "today", "hill"]; // 111 total
    
    var mediumWords = ["stumble", "dismiss", "blackboard", "instructor", "computer", "laboratory", "presence", "absence",
        "classroom", "automatic", "extensive", "intensive", "collect", "ferment", "friendly", "expertise", "pastoralist",
        "rancher", "shepherd", "poultry", "separate", "operate", "migrate", "wheelbarrow", "chicken", "cowboy",
        "tourist", "greenhouse", "develop", "construct", "accommodate", "suburbanize", "museum", "police", "downtown",
        "asymmetric", "residential", "magnificent", "apartment", "building", "symbol", "breathe", "fountain", "fireplace",
        "manage", "butler", "celebrity", "adventurous", "servant", "electrician", "maintain", "adjust", "mailman", "garbage",
        "overdue", "flexible", "reduce", "recycle", "strange", "housewife", "contaminate", "collector", "plastic",
        "transport", "staircase", "handrail", "emergency", "landlord", "bookshelf", "calendar"]; // 70 total
    
    var hardWords = ["architecture", "construction", "demagnetizer", "demonstration", "demonstrator", "dermabrasion",
        "differentiate", "disappointing", "disconsolate", "acquaintance", "accommodation", "conservative",
        "advertisement", "administrator", "amniocentesis", "archaeologist", "authenticate", "breathtaking",
        "conditioner", "educational", "embarrassed", "encyclopedia", "entertainment", "househusband", "hypoallergenic",
        "imprisonment", "independence", "impressionism", "intermittent", "interrogation", ""]; // 30 total
    
    var evilWords = ["antidisestablishmentarianism", "supercalifragilisticexpialidocious", "floccinaucinihilipipification",
        "honorificabilitudinitatibus", "electroencephalography", "pneumonoultramicroscopicsilicovolcanoconiosis",
        "cargoggagoggmanhaugagoggchaubunagungamaugg"]; // 7 total

    // game function variables
    var levels; // Array of levels of the word
    var chosenLevel; // Selected level
    var word; // Generated word
    var guess; // Guess
    var guesses = []; // Array to store guesses
    var lives; // Lives of the hangman
    var counter; // Count correct guesses

    // Get elements
    var showLives = document.getElementById("myLives");
    var resetProgram = document.getElementById("reset");
    
    // function to play
    play = function () {
        
        levels = [easyWords, mediumWords, hardWords, evilWords]; // generate levels array

        chosenLevel = levels[Math.floor(Math.random() * levels.length)]; // generate level by random number
        word = chosenLevel[Math.floor(Math.random() * chosenLevel.length)]; // generate word by randon number
        
        console.log(word); // backdoor
        
        buttons(); // enable buttons

        // invoke game functions
        guesses = [];
        lives = 10;
        counter = 0;
        result();
        comments();
        printLvl();
        canvas();
        
    };

    // create alphabet ul
    var buttons = function () {
        
        myButtons = document.getElementById('alphabetButtons');
        letters = document.createElement('ul'); // create ul element

        for (var i = 0; i < alphabet.length; i++) {
            
            letters.id = 'alphabet';
            list = document.createElement('li'); // create li element
            list.id = 'letter';
            list.innerHTML = alphabet[i]; // print the letter being processed
            
            check(); // check the letter user clicked
            
            // append letters
            myButtons.appendChild(letters);
            letters.appendChild(list);
            
        } // end loop
        
    };

    // Create guesses ul
    result = function () {
        
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul'); // create ul element

        for (var i = 0; i < word.length; i++) {
            
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li'); // create li element
            guess.setAttribute('class', 'guess');

            guess.innerHTML = "_";

            // add a new guess to the guesses string
            guesses.push(guess);
            
            // append the guess
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
            
        } // end loop
        
    };
    
    // Show lives
    comments = function () {
        
        showLives.innerHTML = "You have " + lives + " lives";
        
        if (lives < 1) {
            
            showLives.innerHTML = "Game Over";
            printWord.innerHTML = word;
            
        } // if user didn't get all the letters in all lives of hangman
        
        for (var i = 0; i < guesses.length; i++) {
            
            if (counter === guesses.length) {
                
                showLives.innerHTML = "You Win!";
                
            } // if user have got all letters in the word
            
        } // end loop
        
    };

    // print levels
    var printLvl = function () {
        
        switch (chosenLevel) {
            
            case levels[0]:
                printLevel.innerHTML = "The Chosen Category is Easy Words";
                break;
                
            case levels[1]:
                printLevel.innerHTML = "The Chosen Category is Medium Words";
                break;
                
            case levels[2]:
                printLevel.innerHTML = "The Chosen Category is Hard Words";
                break;
            
            case levels[3]:
                printLevel.innerHTML = "The Chosen Category is Evil Words";
                break;
                
        }

    };

    // Funtion to initialize and create canvas
    canvas = function () {

        myHangman = document.getElementById("hangman"); // get hangman element
        context = myHangman.getContext('2d'); // get 2d context
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
        
    };

    // Function to animate hangman
    var animate = function () {
        
        drawArray[lives](); // draw body parts of hangman in order
        
    };

    // Funtion to draw hangman's head
    head = function () {
        
        myHangman = document.getElementById("hangman"); // get hangman element
        context = myHangman.getContext('2d'); // get 2d context
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

    drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1]; // array of orders to draw the hangman

    // OnClick Function
    check = function () {
        
        list.onclick = function () {
            
            var letterGuessed = (this.innerHTML); // the letter guessed and being processed
            
            this.setAttribute("class", "active");
            
            this.onclick = null; // reset onclick status
            
            for (var i = 0; i < word.length; i++) {
                
                if (word[i] === letterGuessed) {
                    
                    guesses[i].innerHTML = letterGuessed;
                    counter ++; // counter
                    
                }
                
            } // loop through the word
            
            var j = word.indexOf(letterGuessed); // get the index of the letter guessed in the word
            
            if (j === -1) {
                
                lives -= 1;
                comments();
                animate();
                
            } // if the letter is not in the word
            
            else {
                
                comments();
                
            } // if the letter is in the word
            
        };
        
    };

    // function to reset the program
    resetProgram.onclick = function () {
        
        // remove added child of the parent nodes
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        
        context.clearRect(0, 0, 400, 400); // clear canvas
        
        play(); // re-invoke play function
        
    };
    
    play(); // run the play fuction
    
};