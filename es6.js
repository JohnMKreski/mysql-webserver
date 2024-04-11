// blocked scope example
{
    {
      {
        {
          function a() {
            console.log('Running in nested scope');
          }
        }
      }
    }
}

// a();

// function examples
console.log('EMPTY SCOPE', this);

function b() {
console.log('GLOBAL', this);
}

const c = () => {
console.log('MY SCOPE', this); // {} - it's own scope
};

// b();
// c();

const d = {
b: function () {
    console.log('OBJECT CONTEXT', this);
},
c: () => {
    console.log('OWN CONTEXT', this);
},
};

// d.b();
// d.c();

// arrays and objects example:
const arr = [1, 2, 3, 4, 5];
const [first, ...otherNumbers] = arr;
console.log('rest', first, otherNumbers);

const copy = [...arr];
console.log('spread', copy);

const obj = { name: 'bob', age: 50 };
const { name, age } = obj;
console.log(name, age);

const copyObj = { ...obj };
console.log('spread object', copyObj);

// promises
const p = new Promise((resolve, reject) => {
    resolve(true);
});

//old
// p.then(val => console.log(value).catch(err => console.log(err)));

const getTrue = async () => {
    return await p;
};

console.log(getTrue());



