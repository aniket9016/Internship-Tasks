// function Animal(legs)
// {
//     this.legs=legs;
// }
// Animal.prototype.walk=function()
// {
//     console.log('walking on '+this.legs+' legs');
// }
// function Bird(legs)
// {
//     Animal.call(this,legs);
// }
// Bird.prototype=Object.create(Animal.prototype);
// Bird.prototype.constructor=Animal;
// Bird.prototype.fly=function()
// {
//     console.log('flying');
// }
// var piegon=new Bird(2);
// piegon.walk();
// piegon.fly();
class Animal {
    constructor(legs) {
        this.legs = legs;
    }
    walk() {
        console.log('walking on ' + this.legs + ' legs');
    }
}

class Bird extends Animal {
    constructor(legs) {
        super(legs);
    }
    fly() {
        console.log('flying');
    }
}


let bird = new Bird(2);

bird.walk();
bird.fly();
class Dog extends Animal {
    constructor() {
        super(4);
    }
    walk() {
        super.walk();
        console.log(`go walking`);
    }
}

let bingo = new Dog();
bingo.walk();