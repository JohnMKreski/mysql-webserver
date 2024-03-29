//console.log(module);

//anonymous function created in modules exports
/*module.exports = function(a, b) {
    return a + b;
}*/

//console.log(module.exports); //OUTPUT: [Function (anonymous)]
//console.log(module); // OUTPUT: *NEXT LINE
/*
Module {
  id: '.',
  path: '**Given but not disclosed',
  exports: [Function (anonymous)], // HERE. Exports within the module
  filename: '**',
  loaded: false,
  children: [],
  paths: [
    **
  ]
}
*/

/*
exports.sum = function(a, b) { //object.key = ...
    return a + b;
}

exports.subtract = function(a, b) {
    return a - b;
}
*/
//console.log(module);
/*
Module {
  id: '.',
  path: '**Given but not disclosed',
  exports:  sum: [Function (anonymous)], subtract: [Function (anonymous)] }, // HERE. Exports within the module
  filename: '**',
  loaded: false,
  children: [],
  paths: [
    **
  ]
}
*/

//console.log(exports); //{ sum: [Function (anonymous)], subtract: [Function (anonymous)] }

//every script we create is considered a module 
//module.exports is a way to expose the scrips functionality //EXPORTS being the important key
//exports is an object
//Can require this file (test.js) anywhere 
//Has API defined by the exports statement exposed to use the function n(sum, subtract) wherever we want


//CMD Line code for mysql
// sc start mysql -- to start mysql in admin cmd terminal
// - npm start in cmd terminal
// - *develop
// - *crtlC, y -- to quit script
// sc stop mysql -- to quit the mysql service in admin cmd terminal
// sc query mysql -- to see if it's running in admin cmd terminal