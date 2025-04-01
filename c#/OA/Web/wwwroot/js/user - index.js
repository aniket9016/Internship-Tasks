$(document).ready(function () {
    // Load Add User form
    $('#createEditUserModal').click(function () {
        $.ajax({
            url: '@Url.Action("AddUser", "User")',
            type: 'GET',
            success: function (data) {
                $('#modal-content-body').html(data);
                $('#modal-action-user').modal('show');
            },
            error: function (xhr, status, error) {
                console.error('Error loading Add User form:', error);
            }
        });
    });

    // Load Edit User form
    $('.edit-user').click(function () {
        var id = $(this).data('id');
        $.ajax({
            url: '@Url.Action("EditUser", "User")',
            type: 'GET',
            data: { id: id },
            success: function (data) {
                $('#modal-content-body').html(data);
                $('#modal-action-user').modal('show');
            },
            error: function (xhr, status, error) {
                console.error('Error loading Edit User form:', error);
            }
        });
    });

    // Load Delete User confirmation
    $('.delete-user').click(function () {
        var id = $(this).data('id');
        $.ajax({
            url: '@Url.Action("DeleteUser", "User")',
            type: 'GET',
            data: { id: id },
            success: function (data) {
                $('#delete-user-message').html(data);
                $('#delete-user-id').val(id);
                $('#modal-delete-user').modal('show');
            },
            error: function (xhr, status, error) {
                console.error('Error loading Delete User confirmation:', error);
            }
        });
    });
});
