import React from 'react';
import PropTypes from 'prop-types';

import { getCookie } from 'cookies-next';

import Home from '../components/Home';

export default function HomePage({ loginData }) {
  return <Home loginData={loginData} />;
}

export async function getServerSideProps({ req, res }) {
  const token = getCookie('loginData', { req, res });
  const loginData = token || 'notAuth';

  return { props: { loginData } };
}

HomePage.propTypes = {
  loginData: PropTypes.node.isRequired,
};
