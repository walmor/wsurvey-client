import React from 'react';
import SignIn from '../components/signin/SignIn';
import SignUp from '../components/signin/SignUp';

class AuthPage extends React.Component {
  constructor() {
    super();
    this.state = {
      show: 'signin',
    };
  }

  onSignInClick = () => {
    this.setState({ show: 'signin' });
  };

  onSignUpClick = () => {
    this.setState({ show: 'signup' });
  };

  render() {
    const flipperClass = `flipper${this.state.show === 'signup' ? ' flip' : ''}`;
    const signinFocus = this.state.show === 'signin';
    const signupFocus = !signinFocus;

    return (
      <div className="AuthPage">
        <div className="container">
          <div className={flipperClass}>
            <SignIn resetFocus={signinFocus} onSignUpClick={this.onSignUpClick} />
            <SignUp resetFocus={signupFocus} onSignInClick={this.onSignInClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default AuthPage;
