import React, { Component } from 'react';
import { isBrowser } from 'react-device-detect';
import Flipper from '../lib/Flipper';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

class AuthFlipper extends Component {
  constructor() {
    super();
    this.state = { flip: false };
  }

  toggleFlip = () => {
    this.setState(state => ({ flip: !state.flip }));
  };

  render() {
    return (
      <Flipper flip={this.state.flip} className="AuthFlipper">
        <Flipper.Front>
          <SignIn resetFocus={isBrowser && !this.state.flip} onSignUpClick={this.toggleFlip} />
        </Flipper.Front>
        <Flipper.Back>
          <SignUp resetFocus={isBrowser && this.state.flip} onSignInClick={this.toggleFlip} />
        </Flipper.Back>
      </Flipper>
    );
  }
}

export default AuthFlipper;
