  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBPZJi1Fz4uYHnfPEjGUydvIiCVYxF-bmI",
    authDomain: "employeehours-f67dc.firebaseapp.com",
    databaseURL: "https://employeehours-f67dc.firebaseio.com",
    projectId: "employeehours-f67dc",
    storageBucket: "employeehours-f67dc.appspot.com",
    messagingSenderId: "473499022691"
  };

  firebase.initializeApp(config);

// Create a variable to reference the database
var dataRef = firebase.database();

// variables
var name = "";
var role = "";
var startDate = 0;
var monthlyRate = 0;
var monthsWorked = 0;
var totalBilled = 0;

// on click event 
$("#submit").on("click", function(event) {
  event.preventDefault();

  // grabs user input and stores into variables
  name = $("#employeeName").val().trim();
  role = $("#employeeRole").val().trim();
  startDate = $("#startDate").val().trim();
  monthlyRate = $("#monthlyRate").val().trim();

  // push info to firebase
  dataRef.ref().push({
    name: name,
    role: role,
    startDate: startDate,
    monthlyRate: monthlyRate
  });

  // Clear all input fields 
  $(this).closest('form').find("input[type=text], textarea").val('');

});

// child added function
// passes callback function
// snapshot becomes event object
// "grab everything on the root level when a child is added. Then, pass that in to snapshot. Then, once it is added, it will grab values for each child"
dataRef.ref().on("child_added", function(snapshot) {

  console.log(snapshot.val());
  console.log(snapshot.val().name);
  console.log(snapshot.val().role);
  console.log(snapshot.val().startDate);
  console.log(snapshot.val().monthlyRate);

  // change HTML
  $("#name-display").html(snapshot.val().name);
  $("#role-display").html(snapshot.val().role);
  $("#startDate-display").html(snapshot.val().startDate);
  $("#monthlyRate-display").html(snapshot.val().monthlyRate);

  // Add employee to list
  let employeeRow = $('<tr>');
  // Append employee info to new <tr>. (Using template strings from ES6)
  employeeRow.append(`<td>${snapshot.val().name}</td>`);
  employeeRow.append(`<td>${snapshot.val().role}</td>`);
  employeeRow.append(`<td>${snapshot.val().startDate}</td>`);
  employeeRow.append(`<td>Months worked</td>`);
  employeeRow.append(`<td>${snapshot.val().monthlyRate}</td>`);
  employeeRow.append(`<td>Total billed</td>`);

  // Append the new employee row in table 
  $('#employee-table').append(employeeRow);


// handle errors
}, function(errorObject) {

  console.log("ERRORS: " + errorObject.code);

});

  // // order by date added
  // dataRef.ref().orderByChild("dateAdded").on("child_added"
  // $("#name-display").html(snapshot.val().name);
  // $("#name-display").html(snapshot.val().name);
  // $("#name-display").html(snapshot.val().name);
  // $("#name-display").html(snapshot.val().name);
  // );




