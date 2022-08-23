const API_URL = 'http://localhost:3000';
$(function (){
    showListEmployee();
    getBranch();
})

function showListEmployee(){
    $.ajax({
        type: "GET",
        url: `${API_URL}/employee`,
        success: function(data){
            totalEmployee = data.length;
            let html = '';
            console.log(data);
            for(let i = 0; i < totalEmployee; i++){
                html += `<tr id="${data[i]._id}">
                            <td>${i + 1}</td>
                            <td>${data[i].employeeCode}</td>
                            <td>${data[i].name}</td>
                            <td>${data[i].age}</td>
                            <td>${data[i].salary}</td>
                            <td>${data[i].branchId.name}</td>
                            <td><button type="button" onclick="showUpdateForm('${data[i]._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Update
                            </button></td>
                            <td><button class="btn btn-danger" onclick="showConfirmDelete('${data[i]._id}')">Delete</button></td>
                        </tr>`
                        }
            $("#employees").html(html);
        }
    })
}

function resetForm(){
    $("#employeeCode").val('');
    $("#name").val('');
    $("#age").val('');
    $("#salary").val('');
}

function createEmployee(){
    let employeeCode = $('#employeeCode').val();
    let name = $('#name').val();
    let age = $('#age').val();
    let salary = $('#salary').val();
    let branchId = $('#branch').val();
    let employee = {
        employeeCode: employeeCode,
        name: name,
        age: age,
        salary: salary,
        branchId: {
            _id: branchId
        }
    }
    $.ajax({
        type: "POST",
        url: `${API_URL}/employee`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(employee),
        success: function(data){
            totalEmployee++;     
            let html = `<tr id="${data._id}">
                            <td>${totalEmployee + 1}</td>
                            <td>${data.employeeCode}</td>
                            <td>${data.name}</td>
                            <td>${data.age}</td>
                            <td>${data.salary}</td>
                            <td>${data.branchId.name}</td>
                            <td><button type="button" onclick="showUpdateForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Update
                            </button></td>
                            <td><button class="btn btn-danger" onclick="showConfirmDelete('${data._id}')">Delete</button></td>
                        </tr>`
            $('#employees').append(html);
            resetForm();
        }
    })
}

function getBranch() {
    $.ajax({
        type: 'GET',
        url: `${API_URL}/branch`,
        success: function (data) {
            let html = '<option>-- Select branch --</option>';
            for (let i = 0; i < data.length; i++) {
                html += `<option value="${data[i]._id}">${data[i].name}</option>`
            }
            $('#branch').html(html);
        }
    })
}

function showEmployeeCreateForm(id) {
    resetForm();
    getBranch();
    let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="createEmployee('${id}')">Create</button>`;
    $('#title-modal').html('Create employee');
    $('#footer-modal').html(html);
}

function showUpdateForm(id) {
    getBranch();
    let html = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="updateEmployee('${id}')">Save</button>`;
    $('#title-modal').html('Update employee');
    $('#footer-modal').html(html);
    getEmployeeDetail(id);
}

function getEmployeeDetail(id){
    $.ajax({
        type: "GET",
        url: `${API_URL}/employee/${id}`,
        success: function (data) {
            $("#employeeCode").val(data.employeeCode);
            $("#name").val(data.name);
            $("#age").val(data.age);
            $("#salary").val(data.salary);
            $.ajax({
                type: 'GET',
                url: `${API_URL}/branch`,
                success: function (branchs) {
                    let html = '<option>--Select branch--</option>';
                    for (let branch of branchs) {
                        if (branch._id === data.branch?._id){
                            html += `<option value="${branch._id}" selected>${branch.name}</option>`
                        }else {
                            html += `<option value="${branch._id}">${branch.name}</option>`
                        }
                    }
                    $('#branch').html(html);
                }
            })
        }
    })
}

function updateEmployee(id){
    let employeeCode = $('#employeeCode').val();
    let name = $('#name').val();
    let age = $('#age').val();
    let salary = $('#salary').val();
    let branch = $('#branch').val();
    let employee = {
        employeeCode: employeeCode,
        name: name,
        age: age,
        salary: salary,
        branchId: {
            _id: branch
        }
    }
    $.ajax({
        type: 'PUT',
        url: `${API_URL}/employee/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(employee),
        success: function(data){
            let html = `<tr id="${data._id}">
                            <td>${totalEmployee}</td>
                            <td>${data.employeeCode}</td>
                            <td>${data.name}</td>
                            <td>${data.age}</td>
                            <td>${data.salary}</td>
                            <td>${data.branchId? data.branchId.name: ''}</td>
                            <td><button type="button" onclick="showUpdateForm('${data._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Update
                            </button></td>
                            <td><button class="btn btn-danger" onclick="showConfirmDelete('${data._id}')">Delete</button></td>
                        </tr>`
            $(`#${id}`).replaceWith(html);
            Swal.fire(
                'Updated!',
                'Product has been updated.',
                'success'
            ).then(resetForm());
        }
    })
}

function showConfirmDelete(id){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteEmployee(id);
        }
    })
}

function deleteEmployee(id) {
    $.ajax({
        type: 'DELETE',
        url: `${API_URL}/employee/${id}`,
        success: function () {
            Swal.fire(
                'Deleted!',
                'Product has been deleted.',
                'success'
            )
            $(`#${id}`).remove();
        }
    })
}