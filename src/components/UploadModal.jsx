'use client'
import {modalState} from './../../atom/modalAtom'
import {useRecoilState} from 'recoil' 
import Modal from 'react-modal'
import {FiCamera} from 'react-icons/fi'
import { useRef, useState } from 'react'
import {addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db, storage } from  '../app/firebase'
import { useSession } from 'next-auth/react'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'

export default function UploadModal() {
    const [open, setOpen] = useRecoilState(modalState)
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const filePickerRef = useRef(null)
    const captionRef = useRef(null)

    const {data:session} = useSession()
    
    const addImageToPost = (e)=>{
        const reader = new FileReader()
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent)=>{
            setSelectedFile(readerEvent.target.result)
        }
    }

    const uploadPost = async ()=>{
        if (loading) return
        setLoading(true)
        const docRef = await addDoc(collection(db, 'posts'), {
            username: session.user.username,
            caption: captionRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`)
        await uploadString(imageRef, selectedFile, 'data_url').then(async (snapshot)=>{
            const downloadUrl = await getDownloadURL(imageRef)
            await updateDoc(doc(db, 'posts', docRef.id),{
                image: downloadUrl
            })  
        })
        setOpen(false)
        setLoading(false)
        setSelectedFile(null)
    }

  return (
    <div>
      {open && ( 
        <Modal 
        className="bg-white border-2 rounded-md shadow-md top-56 w-[90%] absolute max-w-lg p-6 left-[50%]  translate-x-[-50%]"
            isOpen={open}
            onRequestClose={()=>{setOpen(false);setSelectedFile(null)}}
        >
           <div className='flex flex-col justify-center items-center h-[100%]'>
            
            {selectedFile ?(<img onClick={()=>setSelectedFile(null)} className='w-full max-h-[250px] object-cover cursor-pointer' src={selectedFile} alt=''/>):(<FiCamera onClick={()=>{filePickerRef.current.click()}} className='cursor-pointer h-14 bg-red-200 p-2 rounded-full w-14 border-2 text-red-500'/>)}
            <input type='file'  onChange={addImageToPost} hidden ref={filePickerRef} />
            <input type='text' ref={captionRef} placeholder='Please enter your caption' maxLength='150' className='border-none m-4  focus:ring-0 focus:outline-none w-full text-center'/>
            <button onClick={uploadPost} disabled ={!selectedFile || loading} className='bg-red-600 w-full text-white p-2 shadow-md rounded-md hover:brightness-125 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100'>Upload Post</button>
            </div>
        </Modal>
      )}
    </div>
  )
}
