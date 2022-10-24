import React from 'react';
import PropTypes from 'prop-types';

import { getCookie } from 'cookies-next';

import Login from '../../components/Login';

export default function LoginPage({ loginData }) {
  return <Login loginData={loginData} />;
}

export async function getServerSideProps({ req, res }) {
  const token = getCookie('loginData', { req, res });
  const loginData = token || 'notAuth';

  return { props: { loginData } };
}

LoginPage.propTypes = {
  loginData: PropTypes.node.isRequired,
};
