import React from "react";
import html2canvas from "html2canvas";
import "./ResultImage.css";

const ResultImage = ({ date, nextDate, results, upcoming }) => {
    const handleDownload = () => {
        const element = document.getElementById("result-image");
        html2canvas(element,{scale:3}).then((canvas) => {
            const link = document.createElement("a");
            link.download = `rezultati_${date}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };


    return (
        <div className="wrapper">
            <div className="image-container" id="result-image">
                <h1 className="title-img">МЕМОРИЈАЛЕН ТУРНИР<br />АНДРЕЈ МИТЕВ</h1>

                {results.length> 0 && (<h2 className="subtitle">РЕЗУЛТАТИ<br /><span className="date">{formatDate(date)}</span></h2>)}
                {results.map((match, i) => (
                    <div className="match" key={`result-${i}`}>
                        <div className="team-img">{match.teamA}</div>
                        <div className="score-img">
                            <div className="score-value-img">{match.score}</div>
                            {match.note && <div className="note">{match.note}</div>}
                            <div className="time">{match.time}</div>
                        </div>
                        <div className="team-img">{match.teamB}</div>
                    </div>
                ))}

                {upcoming.length > 0 && (
                    <>
                        <h2 className="subtitle">СЛЕДНИ НАТПРЕВАРИ<br /><span className="date">{formatDate(nextDate)}</span></h2>
                        {upcoming.map((match, i) => (
                            <div className="match" key={`upcoming-${i}`}>
                                <div className="team-img">{match.teamA}</div>
                                <div className="score-img">
                                    <div className="time">{match.time}</div>
                                </div>
                                <div className="team-img">{match.teamB}</div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            <button className="download-btn" onClick={handleDownload}>
                📸 Превземи Слика
            </button>
        </div>
    );
};

export default ResultImage;