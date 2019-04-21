$(document).ready(function () {
    var activeHP = undefined;
    var activeAttack = undefined;
    var baseAttack = undefined;
    var defenderHP = undefined;
    var defenderAttack = undefined;
    var i;
    var j;

    var enemyNum = -1;

    var attacker = undefined;
    var defender = undefined;

    var isGamePlaying = true;
    var cardInit = 0;


    /**************DEFINING CARD OBJECTS INCLUDING STATS */
    var fighter = [
        johnMcclane = {
            name: "John McClane",
            image: "assets/images/johnMcclane3.jpg",
            startingHP: 150,
            baseAttack: 12,
            defenderAttack: 25,
        },
        hansGruber = {
            name: "Hans Gruber",
            image: "assets/images/hansGruber3.jpg",
            startingHP: 180,
            baseAttack: 9,
            defenderAttack: 20,
        },
        alPowell = {
            name: "Sgt. Al Powell",
            image: "assets/images/alPowell3.jpg",
            startingHP: 120,
            baseAttack: 15,
            defenderAttack: 30,

        },
        toniVreski = {
            name: "Toni Vreski",
            image: "assets/images/tonyVreski3.png",
            startingHP: 100,
            baseAttack: 18,
            defenderAttack: 35,

        }];

    /***************CREATING THE FUNCTION TO CREATE AND DISPLAY CARDS BASED ON OBJECT INFO */

    var cards = function (character) {
        //GENERATING A NEW CARD DIV, ADDING A UNIQUE ATTRIBUTE 
        var newCard = $('<button></button>').addClass('card btn clickable').attr("fighterNum", cardInit).attr("style", "margin: 0px 10px 20px 10px;");
        var name = $('<h5></<h5>').text(character.name).addClass('card-title');
        var image = $('<img/>').attr("src", character.image).addClass('card-img-top');
        var text = $('<h6></h6>').text(character.startingHP + " HP").addClass('card-text mx-auto').attr("id", "player-" + cardInit);
        $('.mainSelection').append(newCard);
        $(`[fighterNum=${cardInit}]`).append(name, image, text);

        cardInit++;
    };

    /*****************USING A LOOP TO CALL THE FUNCTION AND GENERATE THE CARDS FOR EACH OBJECT */
    for (var i = 0; i < fighter.length; i++) {
        cards(fighter[i]);
    };

    if (isGamePlaying) { //enemyNum <= 0
        ($('.clickable')).on('click', function () {
            if (attacker == undefined && defender == undefined) {
                $(this).addClass('active mx-auto').removeClass('clickable').appendTo('.yourCharacter').off("click");

                i = this.getAttribute("fighterNum");
                attacker = $(this);
                activeHP = fighter[i].startingHP;
                baseAttack = fighter[i].baseAttack;
                activeAttack = fighter[i].baseAttack;

                //HIDING/DISPLAYING TEXT AND DIVS AFTER PLAYER CHARACTER IS CHOSEN
                $('#instructions').addClass('d-none');
                $('#pcHeading, #enemyHeading').removeClass('d-none');

                //Move other cards to the Enemies section
                $('.enemies').append($('.clickable'));

                //calculates how many enemies there are to fight based on the array length
                enemyNum = (fighter.length - 1);

            } else if (attacker !== undefined && defender == undefined) {
                if (!$(this).hasClass('defeated')) {
                    $(this).addClass('defender mx-auto').removeClass('clickable').appendTo('.activeDefender');

                    j = this.getAttribute("fighterNum");
                    defender = $(this);
                    defenderHP = fighter[j].startingHP;
                    defenderAttack = fighter[j].defenderAttack;

                    //DISPLAYING FIGHT BUTTON, AND ACTIVE DEFENDER SECTION
                    $('#defenderHeading, #fightHeading').removeClass('d-none');
                    if (enemyNum > 0) {
                        $('#enemyText').text('Remaining enemies to fight:');
                    } else if (enemyNum <= 0) {
                        $('#enemyText').addClass('d-none');
                    }

                    $('.fightBtn').attr("disabled", false);
                    // if (enemyNum <= 0) {
                    //     $('#enemyHeading').addClass('d-none');
                    // }

                    //REDUCES THE NUMBER OF ENEMIES BY 1 IF A DEFENDER IS CHOSEN
                    enemyNum--;

                    if (attacker !== undefined && defender !== undefined) {
                        ($('.enemies > *, .defeatedEnemy > *')).addClass('disabled');
                    };
                };
            } else {
                console.log("player clicked a deactived card");
            }
        });


        ($('.fightBtn')).on('click', function () {
            //reduces the HP variables of each character, and adjusts the display
            activeHP = activeHP - defenderAttack;
            $('#player-' + i).text(activeHP + " HP").append("<h6>" + fighter[i].name + " took " + defenderAttack + " damage</h6>");
            defenderHP = defenderHP - activeAttack;
            $('#player-' + j).text(defenderHP + " HP").append("<h6>You hit " + fighter[j].name + " for " + activeAttack + " damage</h6>");

            // checks for win/lose conditions based on HP
            if (activeHP <= 0 && defenderHP > 0) {
                $('#resultModal').modal('show');
                $('#winText').text("You Died & Some Enemies survived: We're gonna need some more FBI guys, I guess")
                isGamePlaying = false;

            } else if (activeHP <= 0 && defenderHP <= 0) {
                $('#resultModal').modal('show');
                $('#winText').text("Whelp. You both died. Try Again?")
                isGamePlaying = false;

                //if you still have HP but the defender dies, move on to the next one
            } else if (activeHP > 0 && defenderHP <= 0) {

                $('.fightBtn').attr("disabled", true);
                //conditions triggered by the number of enemies left in the Queue
                if (enemyNum == 2) {
                    $('#firstModal').modal('show');
                    ($('.enemies > *')).removeClass('disabled');


                } else if (enemyNum == 1) {
                    $('#firstModal').modal('show');
                    $('#nextText').text('You got another one! YIPPIE-KI-YAY')


                } else if (enemyNum <= 0) {
                    $('#resultModal').modal('show');
                    $('#defenderHeading, #fightHeading').addClass('d-none');
                    isGamePlaying = false;
                }

                $(defender).addClass('defeated disabled').removeClass('clickable defender active mx-auto').appendTo('.defeatedEnemy');
                $('#defeatedHeading').removeClass("d-none");
                ($('.defeatedEnemy > *')).addClass('disabled');
                ($('.enemies > *')).removeClass('disabled');

                defender = undefined;

            };

            activeAttack = activeAttack + baseAttack;
            $('#playAgain').click(function () {
                location.reload();
            });
        });


    };


});









