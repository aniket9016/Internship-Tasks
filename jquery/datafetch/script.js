function fetchData(url, tableId) {
    $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        success: function(data) {
            let rows = "";
            data.forEach(item => {
                rows += `<tr>
                            <td>${item.name}</td>
                            <td>${item.color}</td>
                            <td>${item.price}</td>
                        </tr>`;
            });
            $(tableId + " tbody").append(rows);
        },
        error: function(error) {
            console.log("Error fetching data:", error);
        }
    });
}

$(document).ready(function() {
    fetchData("fruits.json", "#fruitsTable");
    fetchData("vegetables.json", "#vegetablesTable");
});