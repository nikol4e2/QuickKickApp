import React, {useEffect, useState} from 'react';
import "./EliminationSimulation.css";
const EliminationSimulation = ({groupATeams, groupBTeams, groupCTeams, groupDTeams, groupETeams, groupFTeams, selectedGroups}) => {



    const sortTeams = (a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        const diffA = a.scoredGoals - a.takenGoals;
        const diffB = b.scoredGoals - b.takenGoals;
        return diffB - diffA;
    };


    const sortedA = [...groupATeams].sort(sortTeams);
    const sortedB = [...groupBTeams].sort(sortTeams);
    const sortedC = [...groupCTeams].sort(sortTeams);
    const sortedD = [...groupDTeams].sort(sortTeams);
    const sortedE = [...groupETeams].sort(sortTeams);
    const sortedF = [...groupFTeams].sort(sortTeams);


    const [error, setError] = useState(null);
    const [hasError, setHasError] = useState(false);


    const [matches, setMatches] = useState([]);


    const makeMatchesPairs=()=> {
        const matchMakers = [];
        matchMakers.push({team1: sortedA[0], team2: sortedC[1]});
        matchMakers.push({team1: sortedD[1], team2: sortedE[1]});
        matchMakers.push({team1: sortedD[0], team2: sortedF[1]});
        matchMakers.push({team1: sortedA[1], team2: sortedB[1]});

        const sortedSelectedGroups = selectedGroups.sort();

        const pairs = [{fix: "1B", pair: null}, {fix: "1C", pair: null}, {fix: "1E", pair: null}, {
            fix: "1F",
            pair: null
        }]

        let queue = [];
        for (let i = 0; i < pairs.length; i++) {
            queue.push(pairs[i]);
        }

        for (let i = 0; i < pairs.length; i++) {
            if (pairs[i].pair == null) {
                for (let j = selectedGroups.length - 1; j >= 0; j--) {
                    if (pairs[i].fix.charAt(1) != sortedSelectedGroups[j].charAt(0)) {
                        pairs[i].pair = sortedSelectedGroups[j];
                        sortedSelectedGroups.splice(j, 1);
                        break;
                    }
                }
            }
        }

            switch (pairs[0].pair.charAt(0)) {
                case 'A': matchMakers.push({team1: sortedB[0],team2: sortedA[2]});
                break;
                case 'C': matchMakers.push({team1: sortedB[0],team2: sortedC[2]});
                break;
                case 'D': matchMakers.push({team1: sortedB[0],team2: sortedD[2]});
                break;
                case 'E': matchMakers.push({team1: sortedB[0],team2: sortedE[2]});
                break;
                case 'F': matchMakers.push({team1: sortedB[0],team2: sortedF[2]});
                break;
            }

            switch (pairs[1].pair.charAt(0)) {
                case 'A': matchMakers.push({team1: sortedC[0],team2: sortedA[2]});
                    break;
                case 'B': matchMakers.push({team1: sortedC[0],team2: sortedB[2]});
                    break;
                case 'D': matchMakers.push({team1: sortedC[0],team2: sortedD[2]});
                    break;
                case 'E': matchMakers.push({team1: sortedC[0],team2: sortedE[2]});
                    break;
                case 'F': matchMakers.push({team1: sortedC[0],team2: sortedF[2]});
                break;
            }
            switch (pairs[2].pair.charAt(0)) {
                case 'A': matchMakers.push({team1: sortedE[0],team2: sortedA[2]});
                    break;
                case 'B': matchMakers.push({team1: sortedE[0],team2: sortedB[2]});
                    break;
                case 'C': matchMakers.push({team1: sortedE[0],team2: sortedC[2]});
                    break;
                case 'D': matchMakers.push({team1: sortedE[0],team2: sortedD[2]});
                    break;

                case 'F': matchMakers.push({team1: sortedE[0],team2: sortedF[2]});
                break;
            }

            switch (pairs[3].pair.charAt(0)) {
                case 'A': matchMakers.push({team1: sortedF[0],team2: sortedA[2]});
                    break;
                case 'B': matchMakers.push({team1: sortedF[0],team2: sortedB[2]});
                    break;
                case 'C': matchMakers.push({team1: sortedF[0],team2: sortedC[2]});
                    break;
                case 'D': matchMakers.push({team1: sortedF[0],team2: sortedD[2]});
                    break;

                case 'E': matchMakers.push({team1: sortedF[0],team2: sortedE[2]});
                break;
            }







        setMatches(matchMakers);
    }

    useEffect(() => {
        makeMatchesPairs();
    },[])

    return (
        <div className="simulation-container">
            <h3 className="simulation-title">Осминафинале</h3>
            <div className="matches-wrapper-simulation">
                {matches.map((match, index) => (
                    <div key={index} className={`match-row-simulation match-${index+1}`}>
                        <span className="match-simulation">{match.team1?.name || "?"} - {match.team2?.name || "?"}</span>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default EliminationSimulation;