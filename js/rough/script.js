function fetchData(callback) {
    setTimeout(() => {
        console.log("✅ Data Fetched");
        callback();
    }, 2000);
}

fetchData(() => {
    console.log("📌 Processing Data...");
});
