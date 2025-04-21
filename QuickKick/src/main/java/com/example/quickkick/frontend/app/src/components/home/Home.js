import React from 'react';
import Hero from "../hero/Hero";
import MatchesSection from "../matchesSection/matchesSection";
import AwardsSection from "../AwardsSection/AwardsSection";

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <MatchesSection></MatchesSection>
            <AwardsSection></AwardsSection>
        </div>
    );
};

export default Home;