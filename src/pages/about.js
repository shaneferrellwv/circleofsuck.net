import * as React from 'react'
import Layout from '@components/Layout'

const AboutPage = () => {
  return (
    <Layout pageTitle='About'>
        <p>This is a tool for finding and visualizing circles of suck.
        It might be cool to show a definition of circle of suck when hovered.
        </p>
    </Layout>
  )
}

export const Head = () => <title>About</title>

export default AboutPage