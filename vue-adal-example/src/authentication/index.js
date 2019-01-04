import AuthenticationContext from 'adal-angular/lib/adal.js'
const endpoints = {
  // Map the location of a request to an API to a the identifier of the associated resource
  'eCRF': 'https://mtz1-dev.exomtrials.com/study/ESRC1/Api.php'
};

const config = {
  tenant: 'c261ec17-d65f-4219-ad99-d4fa5ceb2ec2',
  clientId: 'dd3dab61-7a0c-43aa-9537-a1fb1e9dfa15',
  redirectUri: 'http://localhost:8080',
  cacheLocation: 'localStorage',
  endpoints: endpoints
  // popUp: true
};

export default {
  authenticationContext: null,
  /**
   * @return {Promise}
   */
  initialize() {
    this.authenticationContext = new AuthenticationContext(config);

    return new Promise((resolve, reject) => {
      if (this.authenticationContext.isCallback(window.location.hash) || window.self !== window.top) {
        // redirect to the location specified in the url params.
        this.authenticationContext.handleWindowCallback();
      } else {
        // try pull the user out of local storage
        let user = this.authenticationContext.getCachedUser();

        if (user) {
          resolve();
        } else {
          // no user at all - go sign in.
          this.signIn();
        }
      }
    });
  },
  /**
   * @return {Promise.<String>} A promise that resolves to an ADAL token for resource access
   */
  acquireToken() {
    return new Promise((resolve, reject) => {
      this.authenticationContext.acquireToken(config.clientId, (error, token) => {
        if (error || !token) {
          return reject(error);
        } else {
          return resolve(token);
        }
      });
    });
  },
  /**
   * Issue an interactive authentication request for the current user and the api resource.
   */
  acquireTokenRedirect() {
    this.authenticationContext.acquireTokenRedirect(config.clientId);
  },
  /**
   * @return {Boolean} Indicates if there is a valid, non-expired access token present in localStorage.
   */
  isAuthenticated() {
    // getCachedToken will only return a valid, non-expired token.
    if (this.authenticationContext.getCachedToken(config.clientId)) { return true; }
    return false;
  },
  /**
   * @return An ADAL user profile object.
   */
  getUserProfile() {
    return this.authenticationContext.getCachedUser().profile;
  },
  getUser() {
    return this.authenticationContext.getCachedUser();
  },
  signIn() {
    this.authenticationContext.login();
  },
  signOut() {
    this.authenticationContext.logOut();
  }
}
