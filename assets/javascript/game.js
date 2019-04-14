/*
--> on click event choose character:
character card becomes "Active", other cards become "defenders"
those cards display = none
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
    $('.character').addClass('active');
    $('.character').addClass('d-none');
    var activeHP = $(this).val();
    console.log(activeHP);
    alert("you clicked");
});
var isActive = $('.character').hasClass('.active');
if (isActive) {
    $('.character').appendTo('.yourCharacter')
} else {
    $('.character').appendTo('.')
}
console.log(isActive);