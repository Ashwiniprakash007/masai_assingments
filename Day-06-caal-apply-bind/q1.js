//  student object
let student = {
  name: "Alice",
  age: 22,
  course: "Computer Science"
};

//JSON string
let jsonString = JSON.stringify(student, null, 2);

console.log(jsonString);
