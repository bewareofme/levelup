import type { NextPage } from 'next'
// import Link from 'next/link'
import { useState } from 'react'
// import Header from '../components/Header'
// import Image from 'next/image'
import Card from  '../components/Card'
import MathsCard from '../public/whiteboard.png'
import ScienceCard from '../public/science.png'
import ComputerCard from '../public/computer.png'



const Home: NextPage = () => {
  const [selectedCourse,setSelectedCourse]=useState('grade9')
  return (
      <div>
        <div className='flex gap-2 p-2'>
          <div className={`cursor-pointer ${selectedCourse==='grade9' &&'bg-green-200'}`} onClick={()=>setSelectedCourse('grade9')}>Grade 9</div>
          <div className={`cursor-pointer ${selectedCourse==='sc' &&'bg-green-200'}`} onClick={()=>setSelectedCourse('sc')}>SC</div>
          <div className={`cursor-pointer ${selectedCourse==='hsc' &&'bg-green-200'}`} onClick={()=>setSelectedCourse('hsc')}>HSC</div>
        </div>
                {/* HSC */}
        {selectedCourse==='grade9' && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 gap-2 gap-y-4'>
          <Card course={selectedCourse} subject={'maths'} subjectName={'Mathematics'} colorFrom={"from-[#FAFA33]"} colorTo={"to-white"} source={MathsCard}/>
          <Card course={selectedCourse} subject={'science'} subjectName={'Science'} colorFrom={"from-[#50C878]"} colorTo={"to-white"} source={ScienceCard}/>
          <Card course={selectedCourse} subject={'it'} subjectName={'Information & Technology'} colorFrom={"from-[#3F00FF]"} colorTo={"to-white"} source={ComputerCard}/>
        </div>
        )}
        {/* SC */}
        {selectedCourse==='sc' && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 gap-2  ' >
          <Card course={selectedCourse} subject={'maths'} subjectName={'Mathematics'} colorFrom={"from-[#FAFA33]"} colorTo={"to-white"} source={ScienceCard}/>
        </div>
        )}

        {/* HSC */}
        {selectedCourse==='hsc' && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 gap-2'>
          <Card course={selectedCourse} subject={'maths'} subjectName={'Mathematics'} colorFrom={"from-[#FAFA33]"} colorTo={"to-white"} source={ScienceCard}/>
        </div>
        )}
      </div>
  )
}

export default Home
