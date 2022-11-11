import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const DropzoneComponent = ({ field, form: { touched, errors, setFieldValue }, ...props }) => {
  const onDrop = useCallback(acceptedFiles => {
    setFieldValue(field.name, acceptedFiles)
  }, [])
  const { acceptedFiles, fileRejections, getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    maxFiles: 10,
    noClick: true,
    noKeyboard: true,
  })

  const acceptedFileItems = acceptedFiles.map((file, index) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ))

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
        <button type="button" onClick={open}>
          Open File Dialog
        </button>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </>
  )
}

export default DropzoneComponent
