import * as React from 'react'
import Layout from '@components/Layout'
import './about.css' // Import the CSS file for additional styles

const AboutPage = () => {
  return (
    <Layout pageTitle='About'>
      <div className='mainContainer'>
        <p>circleofsuck.net is a tool for visualizing circles of suck.</p>
        <div className='definitionBox'>
          <strong className='underlined'>circle of suck</strong> <em>—&nbsp; a sports phenomenon where every team in a group has defeated another team, creating a loop of victories; often used as an indicator of parity within a group or league</em>
        </div>
        <h2>How It Works</h2>
        <p>The Circle of Suck problem is a subset of the Traveling Salesman Problem, one of the fundamental classical computing problems.
        The Traveling Salesman Problem states: Given a list of cities and the distances between each pair of cities,
        what is the shortest possible route (otherwise known as a <em>Hamiltonian cycle</em>) that visits each city exactly once and returns to the origin city?
        </p>
        <p>The website is driven by a bot that periodically pulls sport leagues & scores data using a public sports API to find any <em>Hamiltonian cycles</em> within leagues, conferences, and divisions. You can find the bot on Twitter at <a className='link' href="x.com/circleofsuck">@circleofsuck</a>.</p>

        <p>Becuase finding a Circle of Suck is a form of the Traveling Salesman Problem, we can apply any algorithm used to solve the Traveling Salesman Problem to find a circle of suck.</p>
        <p>Unfortunately, the Traveling Salesman Problem falls under the class of NP-hard computational problems.
          This means that mathematicians and scientists haven't been able to find an algorithm that is accurate 100% of the time to solve these problems.</p>
        <p>Instead, we are stuck using algorithms that provide the optimal solution most of the time. For a trivial problem like finding a Circle of Suck, this is perfectly fine.
          This bot's algorithm uses depth-first search with memoization (top-down dynamic programming) and can compute solutions for most groups (on my laptop) in under one-tenth of a second.</p>


        <h2>FAQ</h2>
        <h3>What sports leagues are supported?</h3>
        <p>Currently, the tool supports my favorites sports and leagues. I am working on adding more leagues and sports in the near future.</p>

        <h3>How often is the data updated?</h3>
        <p>My vision for this tool is to update the bot's algorithm to find potential circles of suck using real-time game data in addition to finding already-completed circles of suck. I hope to have this functional by the beginning of the College Football and NFL seasons.</p>
        
        <h2>About the Creator</h2>
        <p>My name is <a className='link' href="https://www.linkedin.com/in/ferrellshanewv/">Shane Ferrell</a> and I am a super senior at the University of Florida studying Computer Science and Electrical Engineering.
           I made this tool in my free time in July 2024 as an exercise in scripting and web development. Don't hesitate to reach out to me at circleofsuck (at) gmail (dot) com with any feedback, questions, or inquiries.</p>
      </div>
    </Layout>
  )
}

export const Head = () => <title>About</title>

export default AboutPage
