// Mac Mie

var nameUber = "";
var oneKMFee = 0;
var twentyKMFee = 0;
var twentyOneKMFee = 0;
var waitingFee = 0;
var distance = 0;
var waitingTime = 0;
var totalPrice = 0;

// Set event for button checkout
document.querySelector(".checkout-button").onclick = function () {
    // Get distance, waiting time and uber id
    distance = document.querySelector(".distance-km").value;
    waitingTime = document.querySelector(".waiting-time").value;

    // Check if any radio is selected
    if ($("input[name=selector]:checked").length > 0) {
        // Get selected radio id
        nameUber = document.querySelector('input[name="selector"]:checked').id;

        // Check if inputs are provided
        if (distance === "" || waitingTime === "") {
            alert("Vui Long Nhap Day Du Thong Tin!");
        }

        if (nameUber === "uberX") {
            // Uber X
            oneKMFee = 8000;
            twentyKMFee = 12000;
            twentyOneKMFee = 10000;
            waitingFee = 2000;

        } else if (nameUber === "uberSUV") {
            // Uber SUV
            oneKMFee = 9000;
            twentyKMFee = 14000;
            twentyOneKMFee = 12000;
            waitingFee = 3000;

        } else {
            // Uber BLACK
            oneKMFee = 19000;
            twentyKMFee = 16000;
            twentyOneKMFee = 14000;
            waitingFee = 4000;

        }

        // Calculate transport fee
        totalPrice = calculate(distance, oneKMFee, twentyKMFee, twentyOneKMFee, waitingTime, waitingFee);
        console.log(distance + " - " + waitingTime + " - " + nameUber+ " - " + totalPrice);

        // Show transportation fee
        $("#xuatTien").text(totalPrice);

        // Show hidden div
        $("#divThanhTien").css('display', 'block');

    } else {
        alert("Vui Long Chon Loai Uber!");
    }
};

// Set event for button bill
document.querySelector(".modal-button").onclick = function () {
    // Get distance, waiting time and uber id
    distance = document.querySelector(".distance-km").value;
    waitingTime = document.querySelector(".waiting-time").value;

    // Check if any radio is selected
    if ($("input[name=selector]:checked").length > 0) {
        // Get selected radio id
        nameUber = document.querySelector('input[name="selector"]:checked').id;

        // Check if inputs are provided
        if (distance === "" || waitingTime === "") {
            alert("Vui Long Nhap Day Du Thong Tin!");
        }

        if (nameUber === "uberX") {
            // Uber X
            oneKMFee = 8000;
            twentyKMFee = 12000;
            twentyOneKM = 10000;
            waitingFee = 2000;

        } else if (nameUber === "uberSUV") {
            // Uber SUV
            oneKMFee = 9000;
            twentyKMFee = 14000;
            twentyOneKM = 12000;
            waitingFee = 3000;

        } else {
            // Uber BLACK
            oneKMFee = 19000;
            twentyKMFee = 16000;
            twentyOneKM = 14000;
            waitingFee = 4000;

        }

        // Calculate transport fee
        totalPrice = calculate();
        console.log(distance + " - " + waitingTime + " - " + nameUber+ " - " + totalPrice);

        // Show transportation fee
        $("#xuatTien").text(totalPrice);

        // Show hidden div
        $("#divThanhTien").css('display', 'block');

        // Render Bill
        renderBill();

    } else {
        alert("Vui Long Chon Loai Uber!");
    }

};

/**
 * Function calculates transportation fee
 * @returns transportation fee
 */
function calculate() {
    if (Number(distance) <= 1 && Number(distance) >= 0) {
        totalPrice = Number(distance) * Number(oneKMFee) + Number(waitingTime) * Number(waitingFee);
    } else if (Number(distance) <= 20) {
        totalPrice = Number(oneKMFee) + (Number(distance) - 1) * Number(twentyKMFee) + Number(waitingTime) * Number(waitingFee);
    } else {
        totalPrice = Number(oneKMFee) + 19 * Number(twentyKMFee) + (Number(distance) - 20) * Number(twentyOneKMFee) + Number(waitingTime) * Number(waitingFee);
    }
    return totalPrice;
}

/**
 * Function return information of Bill
 */
function renderBill() {
    var contentHTML = "";

    if(Number(distance) <= 1){
        contentHTML += `
            <tr>
                <th scope="row">${nameUber}</th>
                <td>1 km</td>
                <td>${oneKMFee}</td>
                <td>${oneKMFee}</td>
            </tr>
            <tr>
                <th scope="row">Thời gian chờ</th>
                <td>${waitingTime} phút</td>
                <td>${waitingFee}</td>
                <td>${Number(waitingFee) * Number(waitingTime)}</td>
            </tr>
            <tr bgcolor="green">
                <th scope="row">Toltal</th>
                <td></td>
                <td></td>
                <td>${totalPrice}</td>
            </tr>
        `
    } else if(Number(distance) <= 20){
        contentHTML += `
            <tr>
                <th scope="row">${nameUber}</th>
                <td>1 km</td>
                <td>${oneKMFee}</td>
                <td>${oneKMFee}</td>
            </tr>
            <tr>
                <th scope="row">${nameUber}</th>
                <td>${Number(distance) - 1} km</td>
                <td>${twentyKMFee}</td>
                <td>${(Number(distance) - 1) * Number(twentyKMFee)}</td>
            </tr>
            <tr>
                <th scope="row">Thời gian chờ</th>
                <td>${waitingTime} phút</td>
                <td>${waitingFee}</td>
                <td>${Number(waitingFee) * Number(waitingTime)}</td>
            </tr>
            <tr bgcolor="green">
                <th scope="row">Toltal</th>
                <td></td>
                <td></td>
                <td>${totalPrice}</td>
            </tr>
        `
    } else{
        contentHTML += `
            <tr>
                <th scope="row">${nameUber}</th>
                <td>1 km</td>
                <td>${oneKMFee}</td>
                <td>${oneKMFee}</td>
            </tr>
            <tr>
                <th scope="row">${nameUber}</th>
                <td>19 km</td>
                <td>${twentyKMFee}</td>
                <td>${Number(twentyKMFee) * 19}</td>
            </tr>
            <tr>
                <th scope="row">${nameUber}</th>
                <td>${Number(distance) - 20} km</td>
                <td>${twentyOneKMFee}</td>
                <td>${(Number(distance) - 20) * Number(twentyOneKMFee)}</td>
            </tr>
            <tr>
                <th scope="row">Thời gian chờ</th>
                <td>${waitingTime} phút</td>
                <td>${waitingFee}</td>
                <td>${Number(waitingFee) * Number(waitingTime)}</td>
            </tr>
            <tr bgcolor="green">
                <th scope="row">Toltal</th>
                <td></td>
                <td></td>
                <td>${totalPrice}</td>
            </tr>
        `
    }

    console.log(contentHTML);
    document.querySelector('#tblBill').innerHTML = contentHTML;
}