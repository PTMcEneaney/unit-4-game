/*
--> on click event choose character:
character card becomes "Active", other cards become "defenders"
those cards move to the defender position
activeHP variable is set to characterHP value 
change the non-active characters to "defenders"
display "defender cards" under the Enemies section

--> on click event choose defender:
enemy card becomes "active defender"

remainging enemy  = display none (ONLY DISPLAY IF HP > 0)
defenderHP variable is set to defender HP value

--> on click event Fight Button:
activeHP = activeHP - defenderAttack
defenderHP = defenderHP - activeAttack
    
if active is still alive
    activeAttack increases by X-points
if active HP is 0 or less
    player loses, print "you lose" message
if defender HP is 0 or less and other defenders are greater than 0
    defeated defender disappears
    allows you to select the next defender 
*/
$(document).ready(function () {
    var activeHP = undefined;
    var activeAttack = undefined;
    var baseAttack = undefined;
    var defenderHP = undefined;
    var defenderAttack = undefined;
    var i;
    var j;

    var enemyNum = -1;

    var attacker;
    var defender;

    var isGamePlaying = true;

    /**************DEFINING CARD OBJECTS INCLUDING STATS */
    var fighter = [
        johnMcclane = {
            name: "John McClane",
            image: "assets/images/johnMcclane3.jpg",
            startingHP: 150,
            baseAttack: 7,
            defenderAttack: 10,
        },
        hansGruber = {
            name: "Hans Gruber",
            image: "assets/images/hansGruber3.jpg",
            startingHP: 180,
            baseAttack: 5,
            defenderAttack: 20,
        },
        alPowell = {
            name: "Sgt. Al Powell",
            image: "assets/images/alPowell3.jpg",
            startingHP: 120,
            baseAttack: 9,
            defenderAttack: 30,

        },
        toniVreski = {
            name: "Toni Vreski",
            image: "assets/images/tonyVreski3.png",
            startingHP: 100,
            baseAttack: 11,
            defenderAttack: 40,

        }];

    /***************CREATING THE FUNCTION TO CREATE AND DISPLAY CARDS BASED ON OBJECT INFO */
    var cardInit = 0;

    var cards = function (character) {
        //GENERATING A NEW CARD DIV, ADDING A UNIQUE ATTRIBUTE 
        var newCard = $('<div></div>').addClass('card btn character').attr("fighterNum", cardInit).attr("style", "margin: 0px 10px 0px 10px;");
        var name = $('<h5></<h5>').text(character.name).addClass('card-title');
        var image = $('<img/>').attr("src", character.image).addClass('card-img-top');
        // var body = $('<div></div>').addClass('card-body');
        var text = $('<h6></h6>').text(character.startingHP + " HP").addClass('card-text').attr("id", "player-" + cardInit);
        $('.mainSelection').append(newCard);
        $(`[fighterNum=${cardInit}]`).append(name, image, text);
        // $('[fighterNum=cardInit]')

        cardInit++;
    };

    /*****************USING A LOOP TO CALL THE FUNCTION AND GENERATE THE CARDS FOR EACH OBJECT */
    for (var i = 0; i < fighter.length; i++) {
        cards(fighter[i]);
    }

    /****************ADDING ON-CLICK EVENTS TO CARDS AND CHANGING DISPLAY INFO*/
    $('.character').on("click", function () {
        if (isGamePlaying) {
            //CREATING A STATE SO YOU CAN ONLY CHOOSE THE ACTIVE PLAYER WHEN THE "ENEMIES" DIV IS EMPTY
            if ($('.enemies').is(':empty') && enemyNum <= 0) {
                $(this).addClass('active mx-auto');
                attacker = $(this);
                console.log(attacker);

                //HIDING/DISPLAYING TEXT AND DIVS
                $('#instructions').addClass('d-none');
                $('#pcHeading').removeClass('d-none');
                $('#enemyHeading').removeClass('d-none');


                i = this.getAttribute("fighterNum");
                activeHP = fighter[i].startingHP;
                baseAttack = fighter[i].baseAttack;
                activeAttack = fighter[i].baseAttack;

                $(this).removeClass('character');
                $('.yourCharacter').append($('.active'));
                $('.enemies').append($('.character'));

                enemyNum = (fighter.length - 1);
                console.log(enemyNum);


                //assigning the clicked card to pre-defined variables

                // ELSE STATE ONLY ALLOWS TO CHOOSE A DEFENDER IF "ACTIVE DEFENDERS" DIV IS EMPTY    
                //if ($('.activeDefender').is(':empty'))    
            } else {

                $(this).addClass('defender');
                $(this).addClass('active mx-auto');

                $('.defender').appendTo($('.activeDefender'));

                j = this.getAttribute("fighterNum");

                $('#defenderHeading').removeClass('d-none');
                $('#fightHeading').removeClass('d-none');
                $('.fightBtn').attr("disabled", false);

                $('#enemyText').text('Remaining enemies to fight:');


                defenderHP = fighter[j].startingHP;
                defenderAttack = fighter[j].defenderAttack;
                console.log(j);

                defender = $(this);
                console.log(defender);

                enemyNum--;
                console.log(enemyNum);
                if (enemyNum <= 0) {
                    $('#enemyHeading').addClass('d-none');
                }


                // console.log($('.defender').getAttribute("fighterNum"));
            }
        }

    });

    $(".fightBtn").on("click", function () {
        activeHP = activeHP - defenderAttack;
        $('#player-' + i).text(activeHP + " HP").append("<h6>You took " + defenderAttack + " damage</h6>");
        defenderHP = defenderHP - activeAttack;
        $('#player-' + j).text(defenderHP + " HP").append("<h6>You hit him for " + activeAttack + " damage</h6>");

        if (activeHP <= 0 && defenderHP > 0) {
            $('#resultModal').modal('show');
            $('#winText').text("You Lost: We're gonna need some more FBI guys, I guess")

            isGamePlaying = false;
        } else if (activeHP <= 0 && defenderHP <= 0) {
            $('#resultModal').modal('show');
            $('#winText').text("Whelp. You both died. Try Again?")


            isGamePlaying = false;
        } else if (activeHP > 0 && defenderHP <= 0) {
            $('.fightBtn').attr("disabled", true);

            console.log(defender[0]);
            $('.defeatedEnemy').append(defender);
            $(defender).addClass('defeated');
            $('.defeated').removeClass('mx-auto');
            $('.defeatedEnemy').addClass('mx-auto');
            $('#defeatedHeading').removeClass("d-none");
            $('#defeatedHeading').off("click");

            $('.defender').removeClass('defender active character');
            if (enemyNum == 2) {
                $('#firstModal').modal('show');

            } else if (enemyNum == 1) {
                $('#firstModal').modal('show');
                $('#nextText').text('You got another one! YIPPIE-KI-YAY')

            } else if (enemyNum <= 0) {
                $('#defenderHeading, #fightHeading').addClass('d-none');
                isGamePlaying = false;
                $('#resultModal').modal('show');
            }

        } else {
            activeAttack = activeAttack * 2;
        }

        $('#playAgain').click(function () {
            location.reload();
        });

    });

});