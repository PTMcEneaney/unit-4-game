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


$('.character').on("click", function() {
    if ($('.enemies').is(':empty')) {
        $(this).addClass('active');
        $(this).removeClass('character');
        $('.yourCharacter').append($('.active'));
        $('.enemies').append($('.character'));
    } else if ($('.activeDefender').is(':empty')) {
        $(this).addClass('defender');
        $('.defender').appendTo($('.activeDefender'));
    } else {

    }

});

var characters = [
johnMcclane = {
    name: "John McClane",
    image: "assets/images/johnMcclane3.jpg",
    startingHP: 150,
    playerAttack: 7,
    defenderAttack: 25,
},
hansGruber = {
    name: "Hans Gruber",
    image: "assets/images/hansGruber3.jpg",
    startingHP: 180,
    attack: 5,
    defenderAttack: 25,
},
alPowell = {
    name: "Sgt. Al Powell",
    image: "assets/images/alPowell3.jpg",
    startingHP: 120,
    attack: 9,
    defenderAttack: 25,
},
toniVreski = {
    name: "Toni Vreski",
    image: "assets/images/tonyVreski3.png",
    startingHP: 100,
    attack: 11,
    defenderAttack: 25,
}];

$(".fightBtn").on("click", function () {

});

/* var cards = function(character) {
    var newCard = $('<div></div>').addClass('card btn character').attr("style", 'width: 17rem;');
    var name = $('<h5></<h5>').text(character.name).addClass('card-title');
    var image = $('<img/>').attr("src", character.image).addClass('card-img-top');
    var body = $('<div></div>').addClass('card-body');
    var text = $('<p></p>').text(character.startingHP + " HP").addClass('card-text');
    $('.mainSelection').append(newCard);

    if ($('.btn').is(':empty')) {
        $('.btn').append(name, image, body, text);
    }
};
cards(johnMcclane);
cards(toniVreski); */
// cards(alPowell);
// cards(hansGruber);

    
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