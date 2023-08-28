const tabStates = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleScript") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            const tabId = activeTab.id;

            if (!tabId) {
                console.error("error");
                sendResponse({ success: false });
                return;
            }

            if (!tabStates[tabId]) {
                tabStates[tabId] = { running: false, intervalId: null };
            }

            const state = tabStates[tabId];
            state.running = !state.running;

            if (state.running) {
                state.intervalId = setInterval(() => {
                    console.log("ok", tabId);
                }, 1000);
            } else {
                clearInterval(state.intervalId);
            }

            const response = { success: true };
            sendResponse(response);
        });
    }
    return true;
});