
const people = [
     { name: "Alice", address: { city: "New York", street: { name: "Broadway", number: 123 } } },
     { name: "Bob", address: { city: "Los Angeles", street: { name: "Sunset Boulevard", number: 456 } } } 
    ];

function check(){
    let res =[]
    for(let {name,address} of people){
              res.push(`${name} lives in ${address.city} on ${address.street.name}`)
    }
    console.log(res)
}
check()