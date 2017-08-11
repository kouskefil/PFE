
function changeLayout (id, cls) {
    var elt = document.getElementById(id);
    var cls = $('.'+cls);
    console.log(elt.style.display);
    if (elt.style.display == "" || elt.style.display == "block"){
        cls.hide('slide', {direction: 'right'}, 400);
    }
    else{
        cls.show('slide', {direction: 'right'}, 400);
    }

    // alert(elt.style.display);
}
function test() {
    alert('toto');
}

