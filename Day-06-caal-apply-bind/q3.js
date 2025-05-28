function personInfo() {
  console.log(`Name: ${this.name}, Age: ${this.age}`);
}

// object with name and age
let person = {
  name: "Alice",
  age: 22
};

personInfo.call(person);
