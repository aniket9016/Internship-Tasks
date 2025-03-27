var cartvalue = 0;
function atc() {
    cartvalue ++;
    document.getElementById("cartvalue").innerHTML = cartvalue;
    alert("Added to cart");
}

function rfc() {
    if(cartvalue>0)
    {
        cartvalue --;
        document.getElementById("cartvalue").innerHTML = cartvalue;
        alert("Removed from cart");
    }else{
        alert("add a item in cart")
    }
}
