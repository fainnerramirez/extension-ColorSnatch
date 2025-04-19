
const handleEventClickDocument = () => {
    document.addEventListener("click", (e) => {
        const {target} = e;
        chrome.storage.local.set({
            valueColor: target.styles
        })    
    });   
}

document.addEventListener("DOMContentLoaded", function () {
    const inputCheck = document.querySelector("#popup__check__colorsnatch");

    if (!inputCheck) {
        throw new Error("input de checkbox no encontrado: ", inputCheck);
    }

    const itemStorage = localStorage.getItem("color-snatch-status") || null;
    console.log("Check localstorage: ", itemStorage);
    inputCheck.checked = itemStorage ? itemStorage : "false";

    inputCheck.addEventListener("click", (event) => {
        const { target } = event;
        const isChecked = target.checked;
        localStorage.setItem("color-snatch-status", isChecked.toString());

        if (isChecked) {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id;
                chrome.tabs.sendMessage(tabId, { action: 'setListenerColorSnatch' });
            });
        }
        else {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id;
                chrome.tabs.sendMessage(tabId, { action: 'deleteListenerColorSnatch' });
                localStorage.removeItem("color-snatch-status");
            });
        }
    });

});