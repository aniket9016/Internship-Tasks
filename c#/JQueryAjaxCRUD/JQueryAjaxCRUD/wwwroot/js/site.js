$(document).ready(function () {
    loadTransactionList();
});

function loadTransactionList() {
    $.get("/Transaction/GetAll", function (data) {
        $("#transactionList").html(data);
    });
}

function showAddOrEditModal(id = 0) {
    $.get(`/Transaction/AddOrEdit/${id}`, function (data) {
        $("#modalContainer").html(data);
        $("#modalContainer").find(".modal").modal("show");
    });
}

$("#transactionForm").submit(function (event) {
    event.preventDefault();
    $.post("/Transaction/AddOrEdit", $(this).serialize(), function (data) {
        if (data.isValid) {
            $("#modalContainer").find(".modal").modal("hide");
            loadTransactionList();
        } else {
            $("#modalContainer").html(data.html);
        }
    });
});

function deleteTransaction(id) {
    if (confirm("Are you sure?")) {
        $.post(`/Transaction/Delete/${id}`, function () {
            loadTransactionList();
        });
    }
}
