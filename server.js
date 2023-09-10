// const express = require ('express');
// const app = express ();
// require ('dotenv').config();

// const PORT = process.env.MY_PORT;

// function today () {
//     const dayInNumber = new Date().getDay();
//     const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const day = daysOfWeek[dayInNumber];
//     return day;
// }

// function timer () {
//     var currentTime = new Date();

//     // Define a +/-2 minute window in milliseconds
//     var windowInMilliseconds = 2 * 60 * 1000; // 2 minutes in milliseconds

//     // Get a random number between -1 and 1 to determine whether to add or subtract from the current time
//     var randomFactor = (Math.random() * 2) - 1;

//     // Calculate the adjusted time by adding the randomFactor multiplied by the window
//     var adjustedTime = new Date(currentTime.getTime() + randomFactor * windowInMilliseconds);

//     // Convert the adjusted time to a string
//     var adjustedTimeString = adjustedTime.toISOString();

//     //console.log("Current UTC time within a +/-2 minute window: " + adjustedTimeString);
//     return adjustedTimeString;

// }

// app.get('/api', (req, res) => {
//     try {

//         const day = today ();
//         const currentTime = timer ();
    
//         const slack_name = req.query.slack_name || 'slack_name';
//         const track = req.query.track || 'backend';
//         const github_file_url = 'https://github.com/25Emmanuel/task-one/server.js';
//         const github_repo_url = 'https://github.com/25Emmanuel/task-one';
    
//         const response = {
//             slack_name: slack_name,
//             current_day: day,
//             utc_time: currentTime,
//             track: track,
//             github_file_url: github_file_url,
//             github_repo_url: github_repo_url,
//             status_code: 200
//         }
      
//         res.status(200).json(response);
//     }
//     catch (error) {
//         console.error(error)
//         res.status(500).json({ error: 'Internal server error!'})
//     }

// })
// app.use((req, res) => {
//     res.status(400).json({ error: 'Not Found'})
// })


// app.listen(PORT, () => {
//     console.log(`listening on port ${PORT}`);
// })

const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Function to format a date as "YYYY-MM-DDTHH:mm:ssZ"
function formatUTCDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

// Define a route that handles GET requests to /api
app.get('/api', (req, res) => {
  try {
    // Get query parameters
    const slack_name = req.query.slack_name || 'example_name';
    const track = req.query.track || 'backend';

    // Get current day of the week
    const currentDate = new Date();
    const options = { weekday: 'long' };
    const currentDay = currentDate.toLocaleDateString('en-US', options);

    // Get current UTC time in the desired format
    const utc_time = formatUTCDate(currentDate);

    // GitHub URLs based on query parameters
    const github_file_url = `https://github.com/hokageCodes/Task-one/blob/main/${track}/server.js`;
    const github_repo_url = `https://github.com/hokageCodes/Task-one${track}`;

    // Prepare the response object
    const response = {
      slack_name: slack_name,
      current_day: currentDay,
      utc_time: utc_time,
      track: track,
      github_file_url: github_file_url,
      github_repo_url: github_repo_url,
      status_code: 200
    };

    // Return the response as JSON
    res.status(200).json(response);
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle not found (404) errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server on your actual deployment URL
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEPLOYMENT_URL || 'http://localhost:3000'}`);
});