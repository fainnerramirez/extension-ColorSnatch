function getComputedColor(element) {
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.color;
}

function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const targetElement = e.target;
    const color = getComputedColor(targetElement);
    console.log("Color capturado:", color);

    console.log("Guardando color en storage:", color);

    chrome.storage.local.set({ capturedColor: color }, function () {
        console.log("Color guardado correctamente en storage");
    });
}

const createTooltipColorSnatch = () => {
    const tooltip = document.createElement("div");
    tooltip.id = "colorsnatch__tooltip";
    tooltip.classList.add("colorsnatch__tooltip");
    tooltip.textContent = "Color Snatch";
    return tooltip;
}

const removeTooltipColorSnatch = () => {
    const tooltip = document.getElementById('colorsnatch__tooltip');
    if (tooltip) tooltip.remove();
}

const assigmentEventTooltip = () => {
    const tooltip = document.getElementById('colorsnatch__tooltip');

    document.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.clientX}px`;
        tooltip.style.top = `${e.clientY}px`;
        tooltip.style.opacity = 1;
    });

    document.addEventListener('mouseleave', () => {
        tooltip.style.opacity = 0;
    });
}

const getBackgroundColor = (color) => {
    if (color) {
        if (color.toString() === 'rgb(255, 255, 255)') {
            color = "#000000";
        }
    }
    return color;
}

const handleColorSnatch = (event) => {
    const { target } = event;
    let { color } = window.getComputedStyle(target);
    const tooltip = document.getElementById('colorsnatch__tooltip');
    tooltip.textContent = color;
    tooltip.style.color = "#FFFFFF";
    tooltip.style.backgroundColor = getBackgroundColor(color);
}

const setListenerColorSnatch = () => {
    console.log("Eventos agregados");
    deleteListenerColorSnatch();

    document.body.appendChild(createTooltipColorSnatch());
    assigmentEventTooltip();
    document.addEventListener("mouseover", handleColorSnatch);

    console.log("Registrando evento de clic...");
    document.addEventListener("click", handleClick, true);
    chrome.storage.local.set({ colorSnatchEnabled: true });
}

const deleteListenerColorSnatch = () => {
    console.log("Eventos eliminados");
    removeTooltipColorSnatch();
    document.removeEventListener("mouseover", handleColorSnatch);
    document.removeEventListener("click", handleClick, true);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Mensaje recibido en content script:", message);

    if (message.action === 'setListenerColorSnatch') {
        console.log("Activando Color Snatch");
        setListenerColorSnatch();
        sendResponse({ status: "Color Snatch activado" });
    }
    if (message.action === 'deleteListenerColorSnatch') {
        console.log("Desactivando Color Snatch");
        deleteListenerColorSnatch();
        sendResponse({ status: "Color Snatch desactivado" });
    }

    return true;
});

console.log("Content script cargado, verificando estado inicial...");
chrome.storage.local.get(["colorSnatchEnabled"], function (result) {
    console.log("Estado inicial:", result.colorSnatchEnabled);
    if (result.colorSnatchEnabled) {
        console.log("Color Snatch debería estar activado, inicializando...");
        setListenerColorSnatch();
    }
});