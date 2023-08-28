import React, { FC, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const Popup: FC<{}> = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [currentTabId, setCurrentTabId] = useState<number | null>(null);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            const url = activeTab.url;
            if (url && url.startsWith("https://github.com/")) {
                setIsDisabled(false);
            }
        });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            const tabId = activeTab.id;

            chrome.storage.local.get("tabStates", (result) => {
                const tabStates = result.tabStates || {};
                const state = tabStates[tabId] || {};
                setIsRunning(state.running || false);
            });
        });
    }, []);

    const handleToggleScript = () => {
        const newScriptState = !isRunning;
        setIsRunning(newScriptState);

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            if (activeTab) {
                const tabId = activeTab.id;

                chrome.runtime.sendMessage({ action: "toggleScript", data: newScriptState, tabId }, () => {
                    chrome.storage.local.get("tabStates", (result) => {
                        const tabStates = result.tabStates || {};
                        tabStates[tabId] = { running: newScriptState };
                        chrome.storage.local.set({ tabStates });
                    });
                });
            }
        });
    };

    return (
        <div>
            <h1>Extension Popup</h1>
            <button onClick={handleToggleScript} disabled={isDisabled}>
                {isRunning ? "Stop Script" : "Start Script"}
            </button>
        </div>
    );
};


const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.createRoot(root).render(<Popup />)
