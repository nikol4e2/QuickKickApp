import React from "react";
import html2canvas from "html2canvas";
import "./ResultImage.css";

import template from "../../../assets/template.png";

import sponsor1 from "../../../assets/mainsponsors/opstina.JPG";
import sponsor2 from "../../../assets/mainsponsors/amphenolPng.png";
import sponsor3 from "../../../assets/mainsponsors/anthuraPng.png";
import sponsor4 from "../../../assets/mainsponsors/miki.jpg";
import sponsor5 from "../../../assets/mainsponsors/ahrohemikal.jpg";
import sponsor6 from "../../../assets/mainsponsors/nalePng.png";
import sponsor7 from "../../../assets/mainsponsors/adientPng.png";

const ResultImage = ({ date, nextDate, results, upcoming }) => {

    const handleDownload = () => {
        const element = document.getElementById("result-image");

        html2canvas(element, {
            scale: 1,
            useCORS: true,
            backgroundColor: null
        }).then((canvas) => {
            const link = document.createElement("a");

            link.download = `results-${date}.png`;
            link.href = canvas.toDataURL("image/png");

            link.click();
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);

        return date.toLocaleDateString("mk-MK", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };


    const HEADER_HEIGHT = 260;
    const SECTION_TITLE_HEIGHT = 90;
    const MATCH_HEIGHT = 135;
    const FOOTER_HEIGHT = 200;


    let height = HEADER_HEIGHT + FOOTER_HEIGHT;

    if (results.length > 0) {
        height += results.length * MATCH_HEIGHT;
    }

    if (upcoming.length > 0) {
        if (results.length > 0) {
            height += SECTION_TITLE_HEIGHT;
        }

        height += upcoming.length * MATCH_HEIGHT;
    }

    const totalMatches = results.length + upcoming.length;

    return (
        <>
            <div
                id="result-image"
                className="result-image"
                style={{
                    height: `${height}px`,
                    backgroundImage: `url(${template})`
                }}
            >


                <div
                    className="result-background"
                    style={{
                        backgroundImage: `url(${template})`
                    }}
                />

                {/* CONTENT */}
                <div className="overlay" style={{
                    marginTop: totalMatches <= 2
                        ? "20px"
                        : `${200 + totalMatches * 20}px`
                }}>

                    {/* RESULTS */}

                    {results.length > 0 && (
                        <>
                            <h1>РЕЗУЛТАТИ</h1>

                            <div className="date">
                                {formatDate(date)}
                            </div>

                            <div className="matches">

                                {results.map((match, index) => (
                                    <div
                                        className="match"
                                        key={index}
                                    >

                                        <div className="match-row">

                                            <div className="team">
                                                {match.teamA}
                                            </div>

                                            <div className="center">

                                                <div className="score-image">
                                                    {match.score}
                                                </div>

                                                {match.note && (
                                                    <div className="note">
                                                        {match.note}
                                                    </div>
                                                )}

                                            </div>

                                            <div className="team">
                                                {match.teamB}
                                            </div>

                                        </div>

                                        <div className="time">
                                            {match.time}
                                        </div>

                                    </div>
                                ))}

                            </div>
                        </>
                    )}



                    {upcoming.length > 0 && (
                        <>
                            <h1>СЛЕДНИ НАТПРЕВАРИ</h1>

                            <div className="date">
                                {formatDate(nextDate)}
                            </div>

                            <div className="matches">

                                {upcoming.map((match, index) => (
                                    <div
                                        className="match"
                                        key={index}
                                    >

                                        <div className="match-row">

                                            <div className="team">
                                                {match.teamA}
                                            </div>

                                            <div className="center">

                                                <div className="next-time">
                                                    {match.time}
                                                </div>

                                            </div>

                                            <div className="team">
                                                {match.teamB}
                                            </div>

                                        </div>

                                    </div>
                                ))}

                            </div>
                        </>
                    )}



                    <div className="sponsors-image">

                        <div className="sponsors-image-title">
                            ПОДДРЖАНО ОД:
                        </div>

                        <div className="sponsors-image-logos-ultra">

                            <img
                                src={sponsor1}
                                alt="Sponsor 1"
                            />

                            <img
                                src={sponsor2}
                                alt="Sponsor 2"
                            />

                            <img
                                src={sponsor3}
                                alt="Sponsor 3"
                            />

                            <img
                                src={sponsor7}
                                alt="Sponsor 4"
                            />

                        </div>

                        <div className="sponsors-image-logos-gold">

                            <img
                                src={sponsor4}
                                alt="Sponsor 5"
                            />

                            <img
                                src={sponsor5}
                                alt="Sponsor 6"
                            />

                            <img
                                src={sponsor6}
                                alt="Sponsor 7"
                            />

                        </div>

                    </div>

                </div>
            </div>

            <button
                className="download-button"
                onClick={handleDownload}
            >
                Превземи
            </button>
        </>
    );
};

export default ResultImage;