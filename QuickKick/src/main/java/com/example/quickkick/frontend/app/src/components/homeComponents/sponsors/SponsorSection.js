import React from "react";
import "./sponsorSection.css";

const sponsors = [

    // ULTRA GOLD


    {
        name: "Општина Чешиново-Облешево",
        img: "/sponsors/opstina.JPG",
        category: "ultra-gold"
    },
    {
        name: "Amphenol",
        img: "/sponsors/Amphenol.JPG",
        category: "ultra-gold"
    },
    {
        name: "Adient",
        img: "/sponsors/Adient.JPG",
        category: "ultra-gold"
    },
    {
        name: "Anthura",
        img: "/sponsors/anthura.JPG",
        category: "ultra-gold"
    },



    // GOLD


    {
        name: "Nale Trans",
        img: "/sponsors/Nale Trans.JPG",
        category: "gold"
    },
    {
        name: "Клиника Љубомировски",
        img: "/sponsors/klinikaLjubomirovski.JPG",
        category: "gold"
    },
    {
        name: "Агрохемикал",
        img: "/sponsors/ahrohemikal.jpg",
        category: "gold"
    },

    //regular
    {
        name: "Пицерија Стефан Облешево",
        img: "/sponsors/picstefam.jpg",
        category: "regular"
    },
    {
        name: "ПЗУ Д-Р. Сашо Панов",
        img: "/sponsors/panovkrug.jpg",
        category: "regular"
    },
    {
        name: "MB Home Engineering",
        img: "/sponsors/mbhome.jpg",
        category: "regular"
    },


    {
        name: "ОУ. Климент Охридски - Облешево",
        img: "/sponsors/klimentOhridski.JPG",
        category: "regular"
    },
    {
        name: "Пицерија Аквариум",
        img: "/sponsors/akvarium2.jpg",
        category: "regular"
    },
    {
        name: "Auto Solution",
        img: "/sponsors/auto2.jpg",
        category: "regular"
    },
    {
        name: "El-Bo Ko-Pro Teks",
        img: "/sponsors/elbo.jpg",
        category: "regular"
    },
    {
        name: "Ресторан Аминта",
        img: "/sponsors/aminta.JPG",
        category: "regular"
    },
    {
        name: "Boutique Angels",
        img: "/sponsors/angels.jpg",
        category: "regular"
    },
    {
        name: "Balkan Trans",
        img: "/sponsors/balkantrans.jpg",
        category: "regular"
    },
    {
        name: "Ресторан Детелинка",
        img: "/sponsors/detelinka.jpg",
        category: "regular"
    },
    {
        name: "Mihajlo Detailing",
        img: "/sponsors/mihajlo.jpg",
        category: "regular"
    },
    {
        name: "ME Vision Agency",
        img: "/sponsors/mevision2.JPG",
        category: "regular"
    },
    {
        name: "Ресторан Преслап",
        img: "/sponsors/preslap.jpg",
        category: "regular"
    },
    {
        name: "Певеце Алуминиум",
        img: "/sponsors/pvc.jpg",
        category: "regular"
    },
    {
        name: "ТП Филип Александров",
        img: "/sponsors/tpfilip.jpg",
        category: "regular"
    },
    {
        name: "E-Stone desing",
        img: "/sponsors/eStone.JPG",
        category: "regular"
    },
    {
        name: "Eko Bilding",
        img: "/sponsors/eko.jpg",
        category: "regular"
    },
    {
        name: "Pace Garden",
        img: "/sponsors/pace garden.jpg",
        category: "regular"
    },
    {
        name: "VI Motors Kocani",
        img: "/sponsors/vimotors.jpg",
        category: "regular"
    },
    {
        name: "AutoWelt",
        img: "/sponsors/autowelt.JPG",
        category: "regular"
    },
    {
        name: "Mak Rent",
        img: "/sponsors/makren.jpg",
        category: "regular"
    },
    {
        name: "Park Fly Skopje",
        img: "/sponsors/park.jpg",
        category: "regular"
    },
    {
        name: "Ginger Fresh Bar",
        img: "/sponsors/ginger.JPG",
        category: "regular"
    },
    {
        name: "Пиљара Драган Паунов (Раде)",
        img: "/sponsors/piljara.jpg",
        category: "regular"
    },


    // =========================
    // INACTIVE / COMMENTED
    // =========================

    // {
    //     name: "Trend",
    //     img: "/sponsors/trend.JPG",
    //     category: "regular"
    // },

    // {
    //     name: "Метало комерц Емирица",
    //     img: "/sponsors/metaloKomerc.JPG",
    //     category: "regular"
    // },

    // {
    //     name: "Evina",
    //     img: "/sponsors/evina.JPG",
    //     category: "regular"
    // },

    // {
    //     name: "EuroPetrol",
    //     img: "/sponsors/euroPetrol.JPG",
    //     category: "regular"
    // },

    // {
    //     name: "Infinity",
    //     img: "/sponsors/infinityCafe.JPG",
    //     category: "regular"
    // },
];

const SponsorSection = () => {
    const renderSponsors = (category, title, className) => {
        const filteredSponsors = sponsors.filter(
            (sponsor) => sponsor.category === category
        );

        if (filteredSponsors.length === 0) return null;

        return (
            <div className={`sponsor-category ${className}`}>
                <h3>{title}</h3>

                <div className="sponsor-grid">
                    {filteredSponsors.map((sponsor) => (
                        <div className="sponsor-card" key={sponsor.name}>
                            <img
                                src={sponsor.img}
                                alt={sponsor.name}
                                className="sponsor-image"
                            />

                            <span className="sponsor-name">
                                {sponsor.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <section className="sponsor-section">
            <div className="sponsor-container">

                <div className="sponsor-header">
                    <h2>Покровители</h2>

                    <p>
                        Голема благодарност до следниве покровители за
                        одржувањето на турнирот во 2026:
                    </p>
                </div>

                {renderSponsors(
                    "ultra-gold",
                    "Ултра златни спонзори",
                    "ultra-gold"
                )}

                {renderSponsors(
                    "gold",
                    "Златни спонзори",
                    "gold"
                )}

                {renderSponsors(
                    "regular",
                    "Спонзори",
                    "regular"
                )}

            </div>
        </section>
    );
};

export default SponsorSection;