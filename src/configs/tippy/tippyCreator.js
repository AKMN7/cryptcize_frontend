import tippy from "tippy.js";

function createTippy(elementID) {
    tippy(elementID, {
        content: "I'm a Tippy tooltip!",
    });
}

export default { createTippy };