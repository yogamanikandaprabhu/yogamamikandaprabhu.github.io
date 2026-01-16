const resultsContainer = document.getElementById('results');

esportsData.forEach(dayData => {
    const daySection = document.createElement('section');
    daySection.classList.add('day');

    // Day title
    const dayTitle = document.createElement('h2');
    dayTitle.textContent = dayData.day;
    daySection.appendChild(dayTitle);

    // Sort matches so winner comes first
    const sortedMatches = [...dayData.matches].sort((a, b) => b.winner - a.winner);

    // Render matches
    const matchesDiv = document.createElement('div');
    matchesDiv.classList.add('matches');
    sortedMatches.forEach(match => {
        const matchDiv = document.createElement('div');
        matchDiv.classList.add('match');
        if(match.winner) matchDiv.classList.add('winner');

        matchDiv.innerHTML = `<p>${match.team} ${match.winner ? '🏆' : ''}</p>
                              <img src="${match.img}" alt="${match.team}">`;
        matchesDiv.appendChild(matchDiv);
    });
    daySection.appendChild(matchesDiv);

    // Sort table by position (winner first)
    const sortedTable = [...dayData.table].sort((a,b) => a.position - b.position);

    // Render table
    const tableDiv = document.createElement('div');
    tableDiv.classList.add('result-table');

    let tableHTML = `<table>
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Team</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>`;
    sortedTable.forEach(team => {
        tableHTML += `<tr class="${team.position===1?'winner-row':''}">
                        <td>${team.position}</td>
                        <td>${team.team}</td>
                        <td>${team.Points}</td>
                      </tr>`;
    });
    tableHTML += `</tbody></table>`;
    tableDiv.innerHTML = tableHTML;
    daySection.appendChild(tableDiv);

    resultsContainer.appendChild(daySection);
});

// Scroll reveal animation
const days = document.querySelectorAll('.day');
window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight * 0.85;
    days.forEach(day => {
        const dayTop = day.getBoundingClientRect().top;
        if(dayTop < triggerBottom) {
            day.style.opacity = '1';
            day.style.transform = 'translateY(0)';
        }
    });
});
