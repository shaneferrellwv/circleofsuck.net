import React from 'react';
import Layout from '@components/Layout';
import MainContainer from '../components/maincontainer';
import './index.css'; // Import the new CSS file

const IndexPage = () => {
  return (
    <Layout pageTitle='404 Page Not Found'>
      <MainContainer>
        Sorry, the page you requrested does not exist!
      </MainContainer>
    </Layout>
  );
};

export const Head = () => <title>Circle Of Suck Finder</title>;

export default IndexPage;
