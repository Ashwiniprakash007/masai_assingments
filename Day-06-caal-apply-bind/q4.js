function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let original = {
  name: "Alice",
  hobbies: ["reading", "traveling"]
};

// Clone the object
let clone = deepClone(original);

// Modify the clone
clone.hobbies.push("coding");

console.log("Original:", original);
console.log("Clone:", clone);
