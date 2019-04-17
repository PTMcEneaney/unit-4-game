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
$(document).ready(function() {
var activeHP = undefined;
var activeAttack = undefined;
var baseAttack = undefined;
var defenderHP = undefined;
var defenderAttack = undefined;
var i;
var j;

/**************DEFINING CARD OBJECTS INCLUDING STATS */
var fighter = [
johnMcclane = {
    name: "John McClane",
    image: "assets/images/johnMcclane3.jpg",
    startingHP: 150,
    baseAttack: 7,
    defenderAttack: 25,
},
hansGruber = {
    name: "Hans Gruber",
    image: "assets/images/hansGruber3.jpg",
    startingHP: 180,
    baseAttack: 5,
    defenderAttack: 25,
},
alPowell = {
    name: "Sgt. Al Powell",
    image: "assets/images/alPowell3.jpg",
    startingHP: 120,
    baseAttack: 9,
    defenderAttack: 25,

},
toniVreski = {
    name: "Toni Vreski",
    image: "assets/images/tonyVreski3.png",
    startingHP: 100,
    baseAttack: 11,
    defenderAttack: 25,

}];

/***************CREATING THE FUNCTION TO CREATE AND DISPLAY CARDS BASED ON OBJECT INFO */
var cardInit = 0;

var cards = function(character) {
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
$('.character').on("click", function() {
    //CREATING A STATE SO YOU CAN ONLY CHOOSE THE ACTIVE PLAYER WHEN THE "ENEMIES" DIV IS EMPTY
    if ($('.enemies').is(':empty')) {
        $(this).addClass('active mx-auto');

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
        $('#enemyText').text('Remaining enemies to fight:');


        defenderHP = fighter[j].startingHP;
        defenderAttack = fighter[j].defenderAttack;
        console.log(j);


        // console.log($('.defender').getAttribute("fighterNum"));
    }

});

$(".fightBtn").on("click", function () {
    activeHP = activeHP - defenderAttack;
    $('#player-' + i).text(activeHP + " HP").append("<h6>You took " + defenderAttack + " damage</h6>");
    defenderHP = defenderHP - activeAttack;
    $('#player-' + j).text(defenderHP + " HP").append("<h6>You hit him for " + activeAttack + " damage</h6>");

    if (activeHP <= 0 && defenderHP > 0) {
        alert("You Were Defeated!");
    } else if (activeHP <= 0 && defenderHP <= 0) {
        alert("You Defeated Each Other");
    } else if (activeHP > 0 && defenderHP <= 0) {
        alert("You beat him! choose a new defender");
        $('.defender').addClass('d-none defeated').append($('.defeated'));
        $('.defender').removeClass('.defender');
        
        /* $('.character').on("click", function() {
            $(this).addClass('defender');
            $('.defender').appendTo($('.activeDefender'));
            j = this.getAttribute("fighterNum");
            defenderHP = fighter[j].startingHP;
            defenderAttack = fighter[j].defenderAttack;
            console.log(j);
        }; */


    } else {
        activeAttack = activeAttack * 2;
    }

});




    
// } else if ($('.enemies').is(":empty"))  { 
//     $('.btn').removeClass('character');
//     $('.btn').addClass('enemy');

//     $('.enemies').append($('.enemy'));

// /*     $('.enemies').on("click", function() {
//         $(this).addClass('defender');
//         if ($('.btn').hasClass('defender')) {
//             $('.defender').append($('.defender'));
//         }    
//     });   
//  */
// } else {

// };
// });

    


// var activeHP = $(this).val();
// console.log(activeHP);
});