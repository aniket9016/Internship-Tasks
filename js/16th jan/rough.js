// splice
let a = [10, 20, 30, 40];
console.log(a);
let newa=a.splice(2, 2);
console.log(a);
console.log(newa);
newa.splice(2,0,50);
console.log(newa);
//slice
let b = [10, 20, 30, 40];
console.log(b);
let newb=b.slice(2,4);
console.log(newb);
console.log(b);