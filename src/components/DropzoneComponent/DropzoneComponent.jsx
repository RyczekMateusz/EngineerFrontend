import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
}

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%',
}

const DropzoneComponent = ({ field, form: { touched, errors, setFieldValue }, wrapperClass = '', ...props }) => {
  const [acceptedFilesState, setAcceptedFilesState] = useState([])

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.png'],
    },
    maxFiles: 12,
    noKeyboard: true,
    onDrop: acceptedFiles => {
      setFieldValue(field.name, acceptedFiles)
      setAcceptedFilesState(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const thumbs = acceptedFilesState.map(file => (
    <div className="thumb" key={file.name}>
      <div className="thumbInner">
        <img
          src={file.preview}
          className="img"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
    </div>
  ))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path}
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => acceptedFilesState.forEach(file => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <span>Drag 'n' drop some files here, or click to select files</span> <br />
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      {!!thumbs.length && (
        <>
          <span>Accepted photos:</span>
          <aside className="thumbsContainer">{thumbs}</aside>
        </>
      )}
      {!!fileRejectionItems.length && (
        <>
          <span>Rejected files:</span>
          <aside>{fileRejectionItems}</aside>
        </>
      )}
    </section>
  )
}

export default DropzoneComponent
