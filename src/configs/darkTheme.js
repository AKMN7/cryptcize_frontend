function isDarkTheme() {
    let result = localStorage.getItem("darkMode");
    return result == 'true';
}

function toggleTheme() {
    let result = localStorage.getItem("darkMode");

    if (result == 'true') {
        localStorage.setItem("darkMode", false);
    } else {
        localStorage.setItem("darkMode", true);
    }

    document.body.classList.toggle("darkBody")
}

export default { isDarkTheme, toggleTheme };