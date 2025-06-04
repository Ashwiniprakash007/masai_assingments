function personInfo() {
  console.log(`Name: ${this.name}, Age: ${this.age}`);
}

// object with name and age
let person = {
  name: "Alice",
  age: 22
};

personInfo.call(person);

//The call() method allows you to invoke a function with a specified this value and arguments provided one by one.


//The apply() method is similar to call(), but it takes arguments as an array instead of listing them one by one.

//The bind() method returns a new function with a specified this value and optional arguments,
//  but does not call the function immediately.