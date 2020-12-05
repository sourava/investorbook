import React, { useState } from 'react';

import { Tabs, Tab, TabPane } from 'shared/components/tabs/Tabs';

const HomePage = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const handleChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <div>
            <Tabs value={currentTab} onChange={handleChange}>
                <Tab label="Investors" />
                <Tab label="Companies" />
            </Tabs>
            <TabPane value={currentTab} index={0}>
                Item One
            </TabPane>
            <TabPane value={currentTab} index={1}>
                Item Two
            </TabPane>
        </div>
    );
}

export default HomePage;
