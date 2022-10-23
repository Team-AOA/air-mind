import React from 'react';
import PropTypes from 'prop-types';

import { getCookie } from 'cookies-next';

import MyWorks from '../../components/MyWorks';

export default function MyWorksPage({ loginData }) {
  return <MyWorks loginData={loginData} />;
}

export async function getServerSideProps({ req, res }) {
  const token = getCookie('loginData', { req, res });
  const loginData = token || 'notAuth';

  return { props: { loginData } };
}

MyWorksPage.propTypes = {
  loginData: PropTypes.node.isRequired,
};
