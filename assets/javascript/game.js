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
var pcAttack = undefined;
var decenderHP = undefined;
var defenderAttack = undefined;


var fighter = [
johnMcclane = {
    name: "John McClane",
    image: "assets/images/johnMcclane3.jpg",
    startingHP: 150,
    pcAttack: 7,
    defenderAttack: 25,
    status: undefined,
},
hansGruber = {
    name: "Hans Gruber",
    image: "assets/images/hansGruber3.jpg",
    startingHP: 180,
    pcAttack: 5,
    defenderAttack: 25,
    status: undefined,
},
alPowell = {
    name: "Sgt. Al Powell",
    image: "assets/images/alPowell3.jpg",
    startingHP: 120,
    pcAttack: 9,
    defenderAttack: 25,
    status: undefined,

},
toniVreski = {
    name: "Toni Vreski",
    image: "assets/images/tonyVreski3.png",
    startingHP: 100,
    pcAttack: 11,
    defenderAttack: 25,
    status: undefined,

}];

var cardInit = 0;

var cards = function(character) {
    var newCard = $('<div></div>').addClass('card btn character').attr("style", 'width: 17rem;').attr("fighterNum", cardInit);
    var name = $('<h5></<h5>').text(character.name).addClass('card-title');
    var image = $('<img/>').attr("src", character.image).addClass('card-img-top');
    var body = $('<div></div>').addClass('card-body');
    var text = $('<p></p>').text(character.startingHP + " HP").addClass('card-text');
    $('.mainSelection').append(newCard);
    $(`[fighterNum=${cardInit}]`).append(name, image, body, text);
    // $('[fighterNum=cardInit]')

    cardInit++;

};
for (var i = 0; i < fighter.length; i++) {
    cards(fighter[i]);
}

$('.character').on("click", function() {
    if ($('.enemies').is(':empty')) {
        $(this).addClass('active');
        var i = this.getAttribute("fighterNum");
        activeHP = fighter[i].startingHP;
        pcAttack = fighter[i].pcAttack;
        fighter[i].status = "active";
        console.log(i);

        $(this).removeClass('character');
        $('.yourCharacter').append($('.active'));
        $('.enemies').append($('.character'));
        //assigning the clicked card to pre-defined variables
        
    } else if ($('.activeDefender').is(':empty')) {
        $(this).addClass('defender');
        $('.defender').appendTo($('.activeDefender'));
        var j = this.getAttribute("fighterNum");

        decenderHP = fighter[j].startingHP;
        defenderAttack = fighter[j].defenderAttack;
        fighter[j].status = "defender";
        console.log(j);

        // console.log($('.defender').getAttribute("fighterNum"));
    }

});

$(".fightBtn").on("click", function () {
   
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