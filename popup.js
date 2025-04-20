document.addEventListener("DOMContentLoaded", function () {
    const inputCheck = document.querySelector("#popup__check__colorsnatch");
    const colorDisplay = document.querySelector("#color-display");

    console.log("Input check find: ", inputCheck);

    if (!inputCheck) {
        throw new Error("input de checkbox no encontrado");
    }

    chrome.storage.local.get(["colorSnatchEnabled"], function (result) {
        inputCheck.checked = result.colorSnatchEnabled || false;
    });

    chrome.storage.local.get(["capturedColor"], function (result) {
        if (result.capturedColor) {
            colorDisplay.style.backgroundColor = result.capturedColor;
            colorDisplay.textContent = result.capturedColor;
            colorDisplay.style.color = "#FFFFFF";
        }
    });

    inputCheck.addEventListener("click", (event) => {
        const isChecked = event.target.checked;
        console.log("Checkbox cambiado a:", isChecked);

        chrome.storage.local.set({ colorSnatchEnabled: isChecked }, function () {
            console.log("Estado guardado en storage:", isChecked);
        });

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabId = tabs[0].id;
            console.log("Enviando mensaje a tab:", tabId);

            chrome.tabs.sendMessage(
                tabId,
                { action: isChecked ? 'setListenerColorSnatch' : 'deleteListenerColorSnatch' },
                function (response) {
                    console.log("Respuesta recibida:", response);
                }
            );
        });
    });

    function rgbToHex(rgb) {
        if (typeof rgb === 'string') {
            const matches = rgb.match(/\d+/g);
            if (matches && matches.length >= 3) {
                const r = parseInt(matches[0]);
                const g = parseInt(matches[1]);
                const b = parseInt(matches[2]);

                const hexR = r.toString(16).padStart(2, '0');
                const hexG = g.toString(16).padStart(2, '0');
                const hexB = b.toString(16).padStart(2, '0');

                return `#${hexR}${hexG}${hexB}`;
            }
        }
        else if (arguments.length >= 3) {
            const r = parseInt(arguments[0]);
            const g = parseInt(arguments[1]);
            const b = parseInt(arguments[2]);

            const hexR = r.toString(16).padStart(2, '0');
            const hexG = g.toString(16).padStart(2, '0');
            const hexB = b.toString(16).padStart(2, '0');

            return `#${hexR}${hexG}${hexB}`;
        }

        return null;
    }

    const buttonRGB = document.querySelector("#rgb");
    const buttonHex = document.querySelector("#hex");

    buttonHex.addEventListener("click", () => {
        buttonRGB.classList.remove("tab-active");
        buttonHex.classList.add("tab-active");
        chrome.storage.local.get(["capturedColor"], function (result) {
            if (result.capturedColor) {
                colorDisplay.style.backgroundColor = result.capturedColor;
                colorDisplay.textContent = rgbToHex(result.capturedColor);
                colorDisplay.style.color = "#FFFFFF";
            }
        });
    });

    buttonRGB.addEventListener("click", () => {
        buttonHex.classList.remove("tab-active");
        buttonRGB.classList.add("tab-active");
        chrome.storage.local.get(["capturedColor"], function (result) {
            if (result.capturedColor) {
                colorDisplay.style.backgroundColor = result.capturedColor;
                colorDisplay.textContent = result.capturedColor;
                colorDisplay.style.color = "#FFFFFF";

            }

            console.log("capturedColor: ", result);
        });
    });
});
