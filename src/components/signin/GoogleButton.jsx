import React from 'react';
import { Icon } from 'antd';

const GoogleButton = () => (
  <a href="http://www.google.com" className="SocialButton GoogleButton">
    <Icon type="google" />
    <span>Sign in with Google</span>
  </a>
);

export default GoogleButton;
