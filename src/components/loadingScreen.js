import React from 'react'
import styled from 'styled-components'
function LoadingScreen() {
  return (
   <Wrap> 
   <div class="custom-loader"></div>
   </Wrap>
  )
}

export default LoadingScreen

const Wrap = styled.div`

z-index:1000;


`