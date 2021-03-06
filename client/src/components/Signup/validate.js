import API from "../../utils/API";
const reSpec = /^\w+$/;
const reNum = /[0-9]/;
const reLow = /[a-z]/;
const reUp = /[A-Z]/;
// eslint-disable-next-line
const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function validateForm(form) {
  // unique usernames and emails
  console.log(form.username);
  let uniqueUsername;
  let uniqueEmail;

  API.validSignup({username: form.username, email: form.email}).then(response => {
    console.log("response");
    console.log(response.data);
      uniqueUsername = response.data.username;
      uniqueEmail = response.data.email;
  });
  // username
  if (uniqueUsername === false) {
    alert("Username must be unique");
    return false;
  }
  if (!reSpec.test(form.username)) {
    alert(
      "Error: Username must contain only letters, numbers and underscores!"
    );
    return false;
  }

  // password
  if (form.pass1 === undefined || form.pass1.length < 6) {
    alert("Error: Password must contain at least six characters!");
    return false;
  }
  if (!reNum.test(form.pass1)) {
    alert("Error: password must contain at least one number (0-9)!");
    return false;
  }
  if (!reLow.test(form.pass1)) {
    alert("Error: password must contain at least one lowercase letter (a-z)!");
    return false;
  }
  if (!reUp.test(form.pass1)) {
    alert("Error: password must contain at least one uppercase letter (A-Z)!");
    return false;
  }

  const passInclUser = form.pass1.includes(form.username);
  if (passInclUser) {
    alert("Error: Password can not contain username!");
    return false;
  }
  if (form.pass1 !== form.pass2) {
    alert("Error: Passwords do not match!");
    return false;
  }
  if (!reEmail.test(form.email.toLowerCase())) {
    alert("Error: Please enter a valid email!");
    return false;
  }

  //email
  if (uniqueEmail === false) {
    alert("Email must be unique");
    return false;
  }

  // first name
  if (!form.first_name) {
    alert("Error: Please enter a valid first name!");
    return false;
  }

  // last name
  if (!form.last_name) {
    alert("Error: Please enter a valid last name!");
    return false;
  }

  // all passes
  else {
    // alert(`Welcome ${form.first_name} ${form.last_name}`);
    return true;
  }
}

export default validateForm;
