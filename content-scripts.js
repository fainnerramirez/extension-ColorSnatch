const createTooltipColorSnatch = () => {
    const tooltip = document.createElement("div");
    tooltip.id = "colorsnatch__tooltip";
    tooltip.classList.add("colorsnatch__tooltip");
    tooltip.textContent = "Color Snatch";
    return tooltip;
}

const removeTooltipColorSnatch = () => {
    const tooltip = document.getElementById('colorsnatch__tooltip');
    if(tooltip) tooltip.remove();
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

const handleColorSnatch = (event) => {
    const { target } = event;
    let { color } = window.getComputedStyle(target);
    const tooltip = document.getElementById('colorsnatch__tooltip');
    tooltip.textContent = color;
    tooltip.style.color = "#FFFFFF";
    tooltip.style.backgroundColor = color;
}

const setListenerColorSnatch = () => {
    document.body.appendChild(createTooltipColorSnatch());
    assigmentEventTooltip();
    document.addEventListener("mouseover", handleColorSnatch);
}

const deleteListenerColorSnatch = () => {
    document.removeEventListener("mouseover", handleColorSnatch);
    removeTooltipColorSnatch();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message action: ", message.action);
    if (message.action === 'setListenerColorSnatch') {
        setListenerColorSnatch();
    }
    if (message.action === 'deleteListenerColorSnatch') {
        deleteListenerColorSnatch();
    }
});