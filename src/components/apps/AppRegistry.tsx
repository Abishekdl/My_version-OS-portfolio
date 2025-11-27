import React from 'react';
import { Terminal } from './Terminal';
import { Browser } from './Browser';
import { Files } from './Files';
import { Notepad } from './Notepad';
import { Skills } from './Skills';
import { Achievements } from './Achievements';
import { GithubApp } from './Github';
import { Linkedin } from './Linkedin';
import { Settings } from './Settings';
import { LearningJourneyV3 } from './LearningJourneyV3';
import { Contact } from './Contact';
import { VSCode } from './VSCode';

export const getAppComponent = (id: string): React.ReactNode => {
    switch (id) {
        case 'terminal': return <Terminal />;
        case 'browser': return <Browser />;
        case 'files': return <Files />;
        case 'notepad': return <Notepad />;
        case 'skills': return <Skills />;
        case 'achievements': return <Achievements />;
        case 'github': return <GithubApp />;
        case 'linkedin': return <Linkedin />;
        case 'settings': return <Settings />;
        case 'learning3': return <LearningJourneyV3 />;
        case 'contact': return <Contact />;
        case 'vscode': return <VSCode />;
        default: return <div>App not found</div>;
    }
};
