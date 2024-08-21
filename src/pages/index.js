import React, { useState } from 'react';
import Layout from '../components/layout';
import MainContainer from '../components/maincontainer';
import Viewer from '../components/viewer';
import Control from '../components/control';
import suck_tree from '../data/suck_tree.json';
import './index.css'; // Import the new CSS file

const IndexPage = () => {
  const [selectedItems, setSelectedItems] = useState(['football', '2023']);
  const [suckItem, setSuckItem] = useState(null); // State to store the "suck" item

  return (
    <Layout pageTitle='Circle of Suck Explorer'>
      <MainContainer>
        <div className="content-container">
          <Control circleOfSuckTree={suck_tree} selectedItems={selectedItems} setSelectedItems={setSelectedItems} setSuckItem={setSuckItem} />
          <Viewer selectedItems={selectedItems} suckItem={suckItem} />
        </div>
      </MainContainer>
    </Layout>
  );
};

export const Head = () => (
  <>
    <title>Circle Of Suck Explorer</title>
    <meta property="og:title" content="Circle Of Suck Explorer" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://circleofsuck.net" />
    <meta property="og:image" content="https://circleofsuck.net/images/logo.png" />
    <meta property="og:description" content="Explore the Circle of Suck. See how teams are connected in their losses and wins." />
    <meta property="og:site_name" content="Circle Of Suck Explorer" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Circle Of Suck Explorer" />
    <meta name="twitter:description" content="Explore the Circle of Suck. See how teams are connected in their losses and wins." />
    <meta name="twitter:image" content="https://circleofsuck.net/images/logo.png" />
    <meta name="twitter:site" content="@circleofsuck" />
  </>
);


export default IndexPage;
