import React from 'react';
import Hero from "../hero/Hero";
import MatchesSection from "../matchesSection/matchesSection";
import AwardsSection from "../AwardsSection/AwardsSection";
import SponsorSection from "../sponsors/SponsorSection";

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <MatchesSection></MatchesSection>
            <AwardsSection></AwardsSection>
            <SponsorSection></SponsorSection>
        </div>
    );
};

export default Home;