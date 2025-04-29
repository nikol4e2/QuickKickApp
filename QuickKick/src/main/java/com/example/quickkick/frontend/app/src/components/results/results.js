import React from 'react';
import GroupsSection from "./groupSection/GroupsSection";
import MatchesResults from "./matchesResults/MatchesResults";

const Results = () => {
    return (
        <div>
            <GroupsSection></GroupsSection>
            <MatchesResults></MatchesResults>
        </div>
    );
};

export default Results;