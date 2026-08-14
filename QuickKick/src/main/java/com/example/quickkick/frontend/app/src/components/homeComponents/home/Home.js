import React from 'react';
import Hero from "../hero/Hero";
import MatchesSection from "../matchesSection/matchesSection";
import AwardsSection from "../AwardsSection/AwardsSection";
import SponsorSection from "../sponsors/SponsorSection";
import "./home.css"

const Home = () => {
    return (
        <div className="home">
            <Hero></Hero>
            <MatchesSection></MatchesSection>
            <AwardsSection></AwardsSection>
            <SponsorSection></SponsorSection>
        </div>
    );
};

export default Home;