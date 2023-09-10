const express = require ('express');
const app = express ();
const PORT = 3000;

function today () {
    const dayInNumber = new Date().getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = daysOfWeek[dayInNumber];
    return day;
}

function timer () {
    var currentTime = new Date();

    // Define a +/-2 minute window in milliseconds
    var windowInMilliseconds = 2 * 60 * 1000; // 2 minutes in milliseconds

    // Get a random number between -1 and 1 to determine whether to add or subtract from the current time
    var randomFactor = (Math.random() * 2) - 1;

    // Calculate the adjusted time by adding the randomFactor multiplied by the window
    var adjustedTime = new Date(currentTime.getTime() + randomFactor * windowInMilliseconds);

    // Convert the adjusted time to a string
    var adjustedTimeString = adjustedTime.toISOString();

    //console.log("Current UTC time within a +/-2 minute window: " + adjustedTimeString);
    return adjustedTimeString;

}

app.get('/api', (req, res) => {
    try {

        const day = today ();
        const currentTime = timer ();
    
        const slack_name = req.query.slack_name || 'slack_name';
        const track = req.query.track || 'backend';
        const github_file_url = 'https://github.com/25Emmanuel/task-one/server.js';
        const github_repo_url = 'https://github.com/25Emmanuel/task-one';
    
        const response = {
            slack_name: slack_name,
            current_day: day,
            utc_time: currentTime,
            track: track,
            github_file_url: github_file_url,
            github_repo_url: github_repo_url,
            status_code: 200
        }
      
        res.status(200).json(response);
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal server error!'})
    }

})
app.use((req, res) => {
    res.status(400).json({ error: 'Not Found'})
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})