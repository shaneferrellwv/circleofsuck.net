// gatsby-ssr.js

import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="favicon"
      rel="icon"
      href="/logo.ico"
    />,
  ]);
};
