
let arr =  [

{ name: "Alice", tasksCompleted: 8, rating: 4.7 },

{ name: "Bob", tasksCompleted: 4, rating: 4.0 },

{ name: "Charlie", tasksCompleted: 6, rating: 3.5 },

{ name: "David", tasksCompleted: 10, rating: 4.9 },

{ name: "Eve", tasksCompleted: 7, rating: 2.8 }

]

function show(arr){
    //Filter the employees who have completed more than 5 tasks.
    let filterData = arr.filter(task => task.tasksCompleted> 5);

//let res=[];
// filterData.map((elem)=>{
//     if(elem.rating>4.5){
//         console.log(`name: ${elem.name}, performance: "Excellent"`)
//     }else if(elem.rating>=3 || elem.rating<=4.5){
//         console.log(`name: ${elem.name}, performance: "Good"`)
//     }else{
//         console.log(`name: ${elem.name}, performance: "Needs Improvement"`)
//     }
// })
let performanceMapped = filterData.map(emp => {
    let performance = "";
    if (emp.rating > 4.5) {
      performance = "Excellent";
    } else if (emp.rating >= 3 && emp.rating <= 4.5) {
      performance = "Good";
    } else {
      performance = "Needs Improvement";
    }

    return { name: emp.name, performance: performance };
  });


  //Sort by performance
  const performanceOrder = {
    "Excellent": 1,
    "Good": 2,
    "Needs Improvement": 3
  };

  performanceMapped.sort((a, b) => {
    return performanceOrder[a.performance] - performanceOrder[b.performance];
  });

  return performanceMapped;

}
//show(arr)
console.log(show(arr))