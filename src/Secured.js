import React, { Component } from 'react';
import Keycloak from 'keycloak-js';

class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    /** alternative:
    const keycloak = Keycloak({
      realm: "MyDemo",
      auth-server-url: "http://localhost:8080/auth",
      ssl-required: "external",
      resource: "my-react-client",
      public-client: true,
      confidential-port: 0
    });
    **/

    // alternative: onLoad: 'check-sso', so view can be unauthenticated with downgraded content
    keycloak.init({onLoad: 'login-required'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <div>
          <p>This is a Keycloak-secured component of your application. You shouldn't be able
          to see this unless you've authenticated with Keycloak.</p>
        </div>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}
export default Secured;