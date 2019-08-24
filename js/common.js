try {
    window.addEventListener('load', init);
} catch (e) {
    console.log("Failed to load the init() function.\nMake sure common.js is loaded last");
}