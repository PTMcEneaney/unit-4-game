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

$('.btn').on("click", function() {
    $(this).addClass('active');
    $(this).removeClass('character');
    $('.yourCharacter').append($('.active'));
    $('.enemies').append($('.character'));
});

// if ($('.yourCharacter').is(":empty") && $('.enemies').is(":empty")) {
//     if ($('.btn').hasClass('active')) {
//     } else {
//         $('.btn').addClass('enemy');
//     }
    


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

