function* generate() {
    console.log('invoked 1st time');
    yield 1;
    console.log('invoked 2nd time');
    yield 2;
}
let gen = generate();
console.log(gen);
let result = gen.next();
console.log(result);
result = gen.next();
console.log(result);
result = gen.next();
console.log(result);
for (const g of gen) {
    console.log(g);
}