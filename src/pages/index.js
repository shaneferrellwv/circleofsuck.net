import React, { useState } from 'react';
import Layout from '@components/Layout'
import MainContainer from '../components/maincontainer'
import Viewer from '../components/viewer'
import Control from '../components/control'
import suck_tree from '../data/suck_tree.json'

const IndexPage = () => {
  const [selectedItems, setSelectedItems] = useState(['football', '2023']);
  const [suckItem, setSuckItem] = useState(null); // State to store the "suck" item

  return (
    <Layout pageTitle='Circle of Suck Finder'>
      <MainContainer>
        <Control circleOfSuckTree={suck_tree} selectedItems={selectedItems} setSelectedItems={setSelectedItems} setSuckItem={setSuckItem} />
        <Viewer selectedItems={selectedItems} suckItem={suckItem} />
      </MainContainer>
    </Layout>
  )
}

export const Head = () => <title>Circle Of Suck Finder</title>

export default IndexPage;
