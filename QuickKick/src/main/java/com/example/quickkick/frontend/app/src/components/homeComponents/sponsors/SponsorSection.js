import React from "react";
import "./sponsorSection.css";

const sponsors = [
    { name: "Општина Чешиново-Облешево", img: "/sponsors/opstina.JPG" },
    { name: "Amphenol", img: "/sponsors/Amphenol.JPG" },
    { name: "Adient", img: "/sponsors/Adient.JPG" },
    { name: "Nale Trans", img: "/sponsors/nale.JPG" },
    { name: "Клиника Љубомировски", img: "/sponsors/klinikaLjubomirovski.JPG" },
    { name: "Агрохемикал", img: "/sponsors/klinikaLjubomirovski.JPG" },
    { name: "Пицерија Стефан Облешево", img: "/sponsors/Pic Stefan.JPG" },
    { name: "ОУ. Климент Охридски - Облешево", img: "/sponsors/klimentOhridski.JPG" },
    { name: "ПЗУ Д-Р. Сашо Панов", img: "/sponsors/panovkrug.jpg" },


    { name: "Пицерија Аквариум", img: "/sponsors/akvarium.JPG" },
    { name: "ME Vision Agency", img: "/sponsors/mevision2.JPG" },
    { name: "Ресторан Преслап", img: "/sponsors/preslap.jpg" },
    { name: "Певеце Алуминиум", img: "/sponsors/pvc.jpg" },
    { name: "ТП Филип Александров", img: "/sponsors/tpfilip.jpg" },
    { name: "AutoWelt", img: "/sponsors/autowelt.JPG" },
    { name: "Ginger Fresh Bar", img: "/sponsors/ginger.JPG"},
    { name: "Trend", img:"/sponsors/trend.JPG"},
    { name: "Метало комерц Емирица", img: "/sponsors/metaloKomerc.JPG" },
    { name: "Evina", img: "/sponsors/evina.JPG" },

    { name: "Слога Чешиново", img: "/sponsors/sloga.JPG" },

    { name: "EuroPetrol", img: "/sponsors/euroPetrol.JPG" },
    { name: "Infinity", img: "/sponsors/infinityCafe.JPG" },



];

const SponsorSection = () => {
    return (
        <section className="sponsor-section">
            <div className="sponsor-container">
                <div className="sponsor-header">
                    <h2>Покровители</h2>
                    <p>Голема благодарност до следниве покровители за одржувањето на турнирот во 2025:</p>
                </div>
                <div className="sponsor-grid">
                    {sponsors.map((sponsor, index) => (
                        <div key={index} className="sponsor-card">
                            <img
                                src={sponsor.img}
                                alt={sponsor.name}
                                className="sponsor-image"
                            />
                            <span className="sponsor-name">{sponsor.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SponsorSection;
