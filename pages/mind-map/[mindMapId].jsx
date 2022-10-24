import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import { getCookie } from 'cookies-next';

import MindMap from '../../components/MindMap';

export default function MindMapPage({ loginData }) {
  const router = useRouter();
  const { mindMapId } = router.query;

  return <MindMap loginData={loginData} mindMapId={mindMapId} />;
}

export async function getServerSideProps({ req, res }) {
  const token = getCookie('loginData', { req, res });
  const loginData = token || 'notAuth';

  return { props: { loginData } };
}

MindMapPage.propTypes = {
  loginData: PropTypes.node.isRequired,
};
