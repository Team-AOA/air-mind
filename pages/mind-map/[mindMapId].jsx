import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import MindMap from '../../components/mindmap';
import { getMindMapAccessInfo } from '../../service/mindmaprequests';
import { getNodesData } from '../../service/noderequests';

export default function MindMapPage({ title, mindMapId, nodeData }) {
  return (
    <>
      <Head>
        {nodeData.map(node => {
          const { _id: id } = node;
          return (
            <meta
              title={title}
              key={id}
              name={node.title}
              content={node.content}
            />
          );
        })}
      </Head>
      <MindMap mindMapId={mindMapId} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { mindMapId } = context.params;
  const data = await getMindMapAccessInfo('anonymous', mindMapId);
  const title = data.mindMap?.title || '';
  const { headNode } = data.mindMap;
  const { node } = await getNodesData('anonymous', mindMapId, headNode);
  const nodeData = Object.values(node);

  return {
    props: {
      title,
      mindMapId,
      nodeData,
    },
  };
}

MindMapPage.propTypes = {
  title: PropTypes.string.isRequired,
  mindMapId: PropTypes.string.isRequired,
  nodeData: PropTypes.object.isRequired,
};
