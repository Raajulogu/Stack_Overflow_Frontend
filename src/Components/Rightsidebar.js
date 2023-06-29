import React from 'react'

const Rightsidebar = () => {
  return (
    <div className='rightside-main'>
        <div>
            <h2>The Overflow Blog</h2>
            <div>
            <p id="rightside-content">The cofounder of Chef is cooking
                up a less painful DevOps (Ep. 584)</p>
                <p id="rightside-content">Improving the developer 
                experience in the energy sector</p>
            </div>
            <h2>Featured on Meta</h2>
            <div>
                <p id="rightside-content">Starting the Prompt Design Site: 
                A New Home in our Stack Exchange 
                Neighborhood</p>
                <p id="rightside-content">Colors update: A more detailed look</p>
                <p id="rightside-content">Does the policy change for AI-generated 
                    content affect users who (want to)...</p>
                <p id="rightside-content">Temporary policy: Generative AI 
                    (e.g., ChatGPT) is banned</p>
            </div>
            <h2>Hot Meta Posts</h2>
            <div>
            <p id="rightside-content">Moderation strike: how is the discussion 
                going between the moderators and...</p>
                <p id="rightside-content">Should [sender] be burninated?</p>
            </div>
        </div>
    </div>
  )
}

export default Rightsidebar