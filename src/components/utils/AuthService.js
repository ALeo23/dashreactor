// ./src/utils/AuthService.js

import Auth0Lock from 'auth0-lock'

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      autoclose: true,
      auth: {
        redirectUrl: 'http://localhost:3000',
        responseType: 'token'
      }
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult){
    // Saves the user token
    this.setToken(authResult.idToken)
  }

  login() {
    // Call the show method to display the widget.
    //this binding will need to be captured for later use because of setTimeout
    var closure = this;
    //setTimeout is needed to wait for token to be return asynchronously
    setTimeout(function() {
      if (!closure.loggedIn()) {
        closure.lock.show();
      }
    }, 500);
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout(){
    // Clear user token and profile data from localStorage
    console.log(this);
    localStorage.removeItem('id_token');
    this.login();
  }
}