import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const page = () => {
  return (
    <div className='h-[100vh] w-[100vw] flex justify-center items-center gap-24 '>
      <Link href="/">
        <Button variant="outline" className="absolute top-4 left-4">
          <ArrowLeft className="mr-2" size={18} />
          Add Code
        </Button>
      </Link>
      <Link href={"/bda"} className='h-52 cursor-pointer w-60 dark:bg-zinc-800 rounded-lg flex justify-center items-center bg-zinc-200 text-black dark:text-white '>BDA</Link>
      <Link href={"/cc"} className='h-52 cursor-pointer w-60 dark:bg-zinc-800 rounded-lg flex justify-center items-center bg-zinc-200 text-black dark:text-white '>CC</Link>
      <Link href={"/other"} className='h-52 cursor-pointer w-60 dark:bg-zinc-800 rounded-lg flex justify-center items-center bg-zinc-200 text-black dark:text-white '>OTHER</Link>
    </div>
  )
}

export default page
