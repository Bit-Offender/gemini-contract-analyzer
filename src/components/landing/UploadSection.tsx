'use client'

import React, { useCallback } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'
import { div } from 'motion/react-client'
import toast from 'react-hot-toast'

const UploadSection = () => {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles)
  }, [])

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    if(fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find((fileRejections) => fileRejections.errors[0].code === 'too-many-files')
      
      const fileSizeTooLarge = fileRejections.find((fileRejections) => fileRejections.errors[0].code === 'file-too-large')

      if(tooManyFiles) {
        toast.error('You can only upload 5 files at a time')
      }

      if(fileSizeTooLarge) {
        toast.error('The file size is too large')
      }
    }
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({ 
    onDrop, 
    onDropRejected,
    maxFiles: 5,
    maxSize:1024*1024*5,
    accept: {
      'image/*': [],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  })

  return (
    <>
      <motion.div
        initial={{ opacity: 0.5, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",}}> 
        <div className='mx-auto max-w-7xl px-6 py-20 lg:px-8'>
            <div className='flex flex-col justify-center items-center text-center gap-10'>
              <Badge variant='secondary' className='rounded-full relative py-2 px-6 bg-slate-900 border-[1.5px] border-gray-500 shadow-white/80 text-white'>
                <Sparkles className='h-8 w-8 mr-2 animate-pulse'/>
                <span>Lorem ipsum dolor sit amet.</span>
              </Badge>
            <h1 className='text-5xl sm:text-6xl font-bold'>Start Uploading</h1>
            <p className='text-xl font-semibold'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, atque.</p>
          </div>
      </div>
    </motion.div>
    <div className='flex flex-col justify-center items-center'>
      <Card {...getRootProps()} className={cn('bg-slate-900 relative border-[1px] transition-colors duration-200 ease-in-out w-3xl h-64')}>
        <CardContent className='flex flex-col justify-center items-center h-full w-full'>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p className='text-center text-white'>Drop the files here ...</p> :
              <div className='flex flex-col justify-center gap-4'>
                <p className='text-white'>Drag &apos;n&apos; drop some files here</p>
                <Button className='rounded-full bg-slate-950 hover:cursor-pointer hover:bg-black/60 transition-all duration-300'>
                  Select Files
                </Button>
              </div>
          }
        </CardContent>
      </Card>
    </div>
  </>
  )
}

export default UploadSection