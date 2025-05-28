//fetchData Function
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5; 
      if (isSuccess) {
        resolve("Data fetched successfully!");
      } else {
        reject("Failed to fetch data.");
      }
    }, 1000); 
  });
}

//fetchDataHandler Function
async function fetchDataHandler() {
  try {
    const result = await fetchData();
    console.log("Fetched data successfully:", result);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

fetchDataHandler();

