import React from 'react'

export default function Navbar() {
  return (
    <div className="w-100vw bg-rsBlue">
        <div className="flex justify-center">
            <a href="https://www.researchsat.space/" target="_blank">
                <img src="/logo/rs-logo.png" alt="ResearchSat logo" className="h-[30px] lg:h-[60px] my-2 lg:my-4 hover:scale-[1.05] transition-all duration-300 delay-100"/>
            </a>
        </div>
    </div>
  )
}
