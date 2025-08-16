'use client'
 
import { usePathname } from 'next/navigation'


interface NavBarProps {
  className?: string;
}

export function NavBar({ className }: NavBarProps = {}){
  const pathname = usePathname()

  return (
<nav className={`fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-white/30 backdrop-blur-md z-50 ${className || ''}`}>
      <div className="flex items-center space-x-6">
       <h1 className="text-xl font-bold text-gray-800">🧀 Cheetos</h1>
      </div>
    </nav>
  )
}

export default NavBar;