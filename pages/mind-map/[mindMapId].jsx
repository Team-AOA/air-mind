import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import MindMap from '../../components/mindmap';
import getPublicMindMapData from '../../service/mindmaprequests';

export default function MindMapPage({ mindMaps, mindMapId }) {
  const metaMindMap = mindMaps.filter(mindMap => {
    const { _id: id } = mindMap;
    return id === mindMapId;
  });

  return (
    <>
      <Head />
      <meta name="title" title={metaMindMap[0].title} />
      <meta name="description" content={metaMindMap[0].access} />
      <MindMap mindMapId={mindMapId} />;
    </>
  );
}

export async function getStaticProps(context) {
  const { mindMapId } = context.params;
  const data = await getPublicMindMapData();

  const mindMaps = await data.mindMap;

  return {
    props: {
      mindMaps,
      mindMapId,
    },
  };
}

export async function getStaticPaths() {
  const data = await getPublicMindMapData();
  const mindMaps = await data.mindMap;
  const paths = [];

  mindMaps.map(mindMap => {
    const { _id: mindMapId } = mindMap;
    paths.push({ params: { mindMapId } });
    return mindMap;
  });

  return {
    paths,
    fallback: true,
  };
}

MindMapPage.propTypes = {
  mindMaps: PropTypes.array.isRequired,
  mindMapId: PropTypes.string.isRequired,
};
