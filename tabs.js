const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');


tabList.addEventListener('keydown', changetabfocus);

tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabPanel);
});


let tabFocus = 0;

function changetabfocus(event) {
    const keydownLeft = 37;
    const keydownRight = 39;


    // when we have the keydwon change the current tab to -1
    if (event.keyCode === keydownLeft || event.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);


        // if the right key is pushed, move the next tab on the right
        if (event.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0
            }
            // if the left key is pushed, move the next tab on the left
        } else if (event.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }

}

function changeTabPanel(event) {
    const targetTab = event.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetPictures = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);
    targetTab.setAttribute("aria-selected", true);

    // mainContainer
    // .querySelectorAll('[role=tabpanel]')
    // .forEach((panel) => panel.setAttribute("hidden", true));
    hideContent(mainContainer, '[role="tabpanel"]')

    // mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');
    showContent(mainContainer, [`#${targetPanel}`]);


    // mainContainer
    // .querySelectorAll('pic')
    // .forEach((pic) => pic.setAttribute("hidden", true));
    hideContent(mainContainer, 'pic')

    // mainContainer.querySelector([`#${targetPictures}`]).removeAttribute('hidden');
    showContent(mainContainer, [`#${targetPictures}`]);

    // mainContainer
    // .querySelectorAll('pic')
    // .forEach((pic) => pic.setAttribute("hidden", true));
    hideContent(mainContainer, '.pic')

    // mainContainer.querySelector([`#${targetPictures}`]).removeAttribute('hidden');
    showContent(mainContainer, [`#${targetPictures}`]);


    // console.log(mainContainer);
}


function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
    parent
        .querySelector(content).removeAttribute('hidden');
}