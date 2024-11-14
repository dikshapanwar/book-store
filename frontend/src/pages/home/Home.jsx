import React, { useState } from 'react'
import Banner from './Banner'
import Top from './Top'
import Recommened from './Recommened'
import News from './News'

function Home() {

  return (
    <>
    <Banner/>
    <Top/>
    <Recommened/>
    <News/>
    </>
  )
}

export default Home