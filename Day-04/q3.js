
let arr = ["electronics", "clothing", "electronics", "toys", "clothing", "toys", "toys"];


function show(arr){
// count each category
  const categoryCounts = arr.reduce((acc, category) => {
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Sort categories by count in descending order
  const sortedCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])  
    // return only category names
    .map(entry => entry[0]);      

  return {
    categoryCounts,
   sortedCategories
  };
}
console.log(show(arr))