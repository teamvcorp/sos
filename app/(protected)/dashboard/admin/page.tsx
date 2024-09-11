import React from 'react'
import { PresentForm } from '../../_components/presentForm'
import ImageUploader from '@/components/image-uploader';
import { PresentFormWithUpload } from '../../_components/presentformwithupload';
const AdminPage = () => {
  return (
    <>
    {/* <PresentForm />
    <ImageUploader /> */}
    <PresentFormWithUpload />
    </>
  )
}

export default AdminPage;