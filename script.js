document.addEventListener('DOMContentLoaded', function () {
    const eventcode = '2025mokc'; 
    const auth_key = 'T7UyhwGYKIT9E7OczxNv24Sj3EPzUyW5dlTCv9C3WFIQbE6FhxR7288YUkUa20zm'; 
    const allianceColor = document.getElementById('allianceColor');
    const teamNumberContainer = document.getElementById('teamNumberContainer');

    // Listen for changes to the alliance color
    allianceColor.addEventListener('change', updateTeamNumber);

    function updateTeamNumber() {
        const selectedAlliance = allianceColor.value;
        const matchNumber = document.getElementById('matchNumber').value;

        // Fetch match data from the API based on the event code and auth key
        fetch(`https://www.thebluealliance.com/api/v3/event/${eventcode}/matches/simple?X-TBA-Auth-Key=${auth_key}`)
            .then(response => response.json())
            .then(data => {
                let teamNumbers = [];

                // Find the match data for the given match number
                const matchData = data.find(match => match.match_number == matchNumber);

                if (matchData && matchData.alliances && matchData.alliances[selectedAlliance]) {
                    // Get the team keys from the selected alliance and extract the numbers
                    teamNumbers = matchData.alliances[selectedAlliance].team_keys.map(teamKey => {
                        return teamKey.replace('frc', ''); // Remove the 'frc' prefix to get the team number
                    });
                }

                // Clear the existing options
                teamNumberContainer.innerHTML = '';

                // Create the label for team number
                const label = document.createElement('label');
                label.setAttribute('for', 'teamNumber');
                label.textContent = 'Team Number:';

                // Create a select input for team numbers
                const teamNumberSelect = document.createElement('select');
                teamNumberSelect.id = 'teamNumber';
                teamNumberSelect.name = 'entry.979319178';
                teamNumberSelect.required = true;

                // Populate the select options with the dynamic team numbers
                teamNumbers.forEach(function (teamNumber) {
                    const option = document.createElement('option');
                    option.value = teamNumber;
                    option.textContent = teamNumber;
                    teamNumberSelect.appendChild(option);
                });

                // Append the label and select element
                teamNumberContainer.appendChild(label);
                teamNumberContainer.appendChild(teamNumberSelect);
            })
            .catch(error => {
                console.error('Error fetching match data:', error);
                teamNumberContainer.innerHTML = 'Error fetching team data';
            });
    }

    // Initial call to set the team number options based on the default alliance color
    updateTeamNumber();
});

function redirectAfterSubmit() {
    setTimeout(() => {
        window.location.href = "submited.html"; 
    }, 500); 
}
