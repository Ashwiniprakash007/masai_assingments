let counter = 0;

let loadingInterval = setInterval(() => {
  console.log("Loading...");
  counter++;

  if (counter === 5) {
    clearInterval(loadingInterval);
    console.log("Loaded successfully!");
  }
}, 1000);