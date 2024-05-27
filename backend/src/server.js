const app = require('./app.js');

const port = process.env.PORT || 3000;

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}).on("error", (error) => {
  // Handle errors that occur when starting the server
  if (error.code === "EADDRINUSE") {
    console.log("PORT is already in use.");
  } else {
    console.log("Server Errors: ", error);
  }
});