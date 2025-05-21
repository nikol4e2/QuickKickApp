import React, { useEffect, useState } from "react";
import Service from "../../../repository/repository";
import ResultImage from "../resultImage/ResultImage";
import "./ListingMatches.css"
const ListingMatches = () => {
    const [matches, setMatches] = useState([]);
    const [selectedMatches, setSelectedMatches] = useState([]);


    const groupMatchesByDate = (matches) => {
        const grouped = {};
        matches.forEach(match => {
            const date = new Date(match.date).toLocaleDateString("mk-MK");
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push(match);
        });
        return grouped;
    };


    useEffect(() => {
        Service.fetchAllMatches()
            .then((res) => setMatches(res.data))
            .catch(console.error);
    }, []);

    const toggleSelectMatch = (id) => {
        setSelectedMatches((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );
    };

    const selected = matches.filter((m) => selectedMatches.includes(m.id));

    // групирај по статус
    const finishedMatches = selected.filter((m) => m.status === "FINISHED");
    const upcomingMatches = selected.filter((m) => m.status !== "FINISHED");

    // претвори во format што ResultImage очекува
    const formatMatch = (match) => ({
        teamA: match.team1.name,
        teamB: match.team2.name,
        score: `${match.goalsTeam1}:${match.goalsTeam2}`,
        note: match.note || "",
        time: new Date(match.date).toLocaleTimeString("mk-MK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
    });

    const formatUpcoming = (match) => ({
        teamA: match.team1.name,
        teamB: match.team2.name,
        time: new Date(match.date).toLocaleTimeString("mk-MK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        }),
    });


    const displayDate = finishedMatches.length > 0
        ? new Date(finishedMatches[0].date).toLocaleDateString("mk-MK")
        : "";

    const nextDate = upcomingMatches.length > 0
        ? new Date(upcomingMatches[0].date).toLocaleDateString("mk-MK")
        : "";

    const grouped= groupMatchesByDate(matches);
    return (
        <div className="listing-container">
            <h1>Селектирај натпревари</h1>

            {Object.entries(grouped).map(([date, matchesForDate]) => (
                <div key={date} className="date-group">
                    <h2>{date}</h2>
                    {matchesForDate.map((match) => (
                        <div key={match.id} className="match-row">
                            <input
                                type="checkbox"
                                checked={selectedMatches.includes(match.id)}
                                onChange={() => toggleSelectMatch(match.id)}
                            />
                            <span className="match-text">
              {match.team1.name}{" "}
                                {match.status === "FINISHED"
                                    ? `ЗАВРШЕН ${match.goalsTeam1}:${match.goalsTeam2}`
                                    : ""}
                                {" "}{match.team2.name} –{" "}
                                {new Date(match.date).toLocaleTimeString("mk-MK", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                })}
            </span>
                        </div>
                    ))}
                </div>
            ))}

            {selected.length > 0 && (
                <ResultImage
                    date={displayDate}
                    nextDate={nextDate}
                    results={finishedMatches.map(formatMatch)}
                    upcoming={upcomingMatches.map(formatUpcoming)}
                />
            )}
        </div>
    );
};

export default ListingMatches;