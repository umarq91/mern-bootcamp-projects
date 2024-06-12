"use client"
import { useParams } from 'next/navigation'
import React from 'react'

function JobDetails() {
   const {id} =  useParams()
  return (
    <div>JobDetails2</div>
  )
}

export default JobDetails