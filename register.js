const registerButton = document.getElementById('register');

registerButton.addEventListener('click', postUser);

window.addEventListener('load', getUsers);
// add users container element
const usersContainer = document.getElementById('myUsers');
// updateUI function
function updateUI(users) {
    // get an array of GET users request.
    users.forEach(user => {
    // for each element, create a new div with data
     const newElement = `
     <div class="card col-lg-4 col-md-6 col-sm-12">
     <div class="card-body textCard">
        <h5 class="card-title">${user.username}</h5>
        <p class="card-text">Created by: ${user.name}</p>
      </div>
     </div>
     <br>`;
     // add new DIV to our usersContainer
     usersContainer.insertAdjacentHTML("beforeend", newElement);
    });
}

function getUsers(){
    const headers = new Headers({'Content-Type': 'application/json'});
    return fetch('http://localhost:3000/users', {
    method: 'GET',
    headers: headers
    }).then(response => {
        return response.json();
    }).then(res => updateUI(res));
}

async function getAsyncUsers(){
    const headers = new Headers({'Content-Type': 'application/json'});
    const APIcall = await fetch('http://localhost:3000/users', {
        method: 'GET',
        headers: headers});
    const parseJSON = await APIcall.json();
    const data = await parseJSON;
    console.log(data);
}

function postUser(event) {
    // avoid default behaviour
    event.preventDefault();
    // get data values;
    const data = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    // update UI
    updateUI([data]);
    // define headers
    const headers = new Headers({'Content-Type': 'application/json'});
    // pass object to JSON
    const transformData = JSON.stringify(data);
    /* 
     JSON example => {
         "name" : "myname",
         "username": "myusername",
         "password": "mypass"
     }
    */
    // make POST Call, create user in db.json
    return fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: headers,
    body: transformData
    }).then(response => {
        return response.json();
    }).then(res => {
        console.log(res);
        // erase past info
        document.getElementById('name').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });

}

function printValues(event){
    event.preventDefault();
    const data = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };
    console.log(data);
} 


