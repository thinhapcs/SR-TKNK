import decodeJwt from "jwt-decode";
import isEmail from 'validator/lib/isEmail';

class Auth {
  login = async (email, password) => {
    // Assert email is not empty
    if (!(email.length > 0) || !(password.length > 0) || !isEmail(email)) {
      throw new Error("QR-Code is invalid!");
    }
    // Create data JSON
    // const formData = new FormData();
    // formData.append("username", email);
    // formData.append("password", password);
    // Create request
    
    // const request = new Request("http://localhost:8000/auth/login", {
    // // const request = new Request("https://server-srtknk-cxnam-ews.education.wise-paas.com/auth/login", {
    //   method: "POST",
    //   body: formData,
    // });
    const request = await fetch('http://localhost:8000/auth/login', { 
      method: 'POST', 
      body: {email, password},
      headers: {'Content-Type': 'application/json'}
    });
    // Fetch request
    const response = await fetch(request);
    console.log(response);
    // 500 error handling
    // if (response.status === 500) {
    //   throw new Error("Internal server error");
    // }
    // Extracting response data
    const data = await response.json();
    // 400 error handling
    if (response.status >= 400 && response.status < 500) {
      if (data.detail) {
        throw data.detail;
      }
      throw data;
    }
    // Successful login handling
    if ("token" in data) {
      // eslint-disable-next-line
      const decodedToken = decodeJwt(data["token"]);
      console.log("Hey");
      console.log(decodedToken);
      console.log(data["token"]);
      console.log(data);
      localStorage.setItem("token", data["access_token"]);
      localStorage.setItem("permissions", "user");
    }
    return data;
  };
  
  logout = (callback, ws) => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    const url = "ws://localhost:8000/add-item";
    ws = new WebSocket(url);
    ws.send('Logout');

    // Using a callback to load '/' when logout is called
    callback();
  };

  getUser = async () => {
    const token = localStorage.getItem("token");
    // Create request
    const request = new Request("http://localhost:8000/auth/users/me", {
    // const request = new Request("https://server-srtknk-cxnam-ews.education.wise-paas.com/auth/users/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    // Fetch request
    const response = await fetch(request);
    const data = await response.json();
    return data;
  };

  isAuthenticated = () => {
    const permissions = localStorage.getItem("permissions");
    console.log(permissions);
    if (!permissions) {
      return false;
    }
    return permissions === "user" ? true : false;
  };

  sendOrder = (orders) => {
    console.log(orders);
    let items = 0;
    let total = 0;
    // orders.map((order) => ((items += order.items), (total += order.cost)));
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    console.log(dateTime);
    const formData = new FormData();
    formData.append("list", orders);
    formData.append("items", items);
    formData.append("total", total);
    formData.append("dateTime", dateTime);
  };

  // register = async (firstName, lastName, email, password, passwordConfirmation) => {
  //   // Assert firstName, lastName and phone not empty
  //   if (!((firstName.length) > 0)) {
  //     throw new Error('First Name was not provided');
  //   }
  //   // Assert firstName, lastName and phone not empty
  //   if (!((lastName.length) > 0)) {
  //     throw new Error('Last Name was not provided');
  //   }
  //   // Assert email is not empty
  //   if (!(email.length > 0)) {
  //     throw new Error('Email was not provided');
  //   }
  //   // Assert password is not empty
  //   if (!(password.length > 0)) {
  //     throw new Error('Password was not provided');
  //   }
  //   // Assert password confirmation is not empty
  //   if (!(passwordConfirmation.length > 0)) {
  //     throw new Error('Password confirmation was not provided');
  //   }
  //   // Assert email or password or password confirmation is not empty
  //   if (password !== passwordConfirmation) {
  //     throw new Error('Passwords do not match')
  //   }
  //   // Create data JSON
  //   const formData = {
  //     "email": email,
  //     "password": password,
  //     "firstName": firstName,
  //     "lastName": lastName,
  //   }
  //   // Create request
  //   const request = new Request('https://server-srtknk-cxnam-ews.education.wise-paas.com/auth/register', {
  //     method: 'POST',
  //     body: JSON.stringify(formData),
  //   });
  //   // Fetch request
  //   const response = await fetch(request);
  //   // 500 error handling
  //   if (response.status === 500) {
  //     throw new Error('Internal server error');
  //   }
  //   // 400 error handling
  //   const data = await response.json();
  //   if (response.status >= 400 && response.status < 500) {
  //     if (data.detail) {
  //       throw data.detail;
  //     }
  //     throw data;
  //   }
  //   // Successful login handling
  //   if ('access_token' in data) {
  //     // eslint-disable-next-line
  //     const decodedToken = decodeJwt(data['access_token']);
  //     console.log('Hey');
  //     console.log(decodedToken);
  //     localStorage.setItem('token', data['access_token']);
  //     localStorage.setItem('permissions', 'user');
  //   }
  //   return data;
  // };
}

export default new Auth();
