import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { ReactComponent as BoldIcon } from '../../svg/bold.svg'
import { ReactComponent as ItalicIcon } from '../../svg/italic.svg'
import { ReactComponent as StrikethroughIcon } from '../../svg/strikethrough.svg'
import { ReactComponent as BulletIcon } from '../../svg/list-bullet.svg'
import { ReactComponent as OrderedIcon } from '../../svg/list-ordered.svg'
import { ReactComponent as UndoIcon } from '../../svg/undo-arrow.svg'
import { ReactComponent as RedoIcon } from '../../svg/redo-arrow.svg'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="editor-buttons">
      <div className="editor-buttons__group">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
          {/* <H1Icon /> */}
          <span>H1</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
          <span>H2</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
          <span>H3</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}>
          <span>H4</span>
        </button>
      </div>

      <div className="editor-buttons__group">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}>
          <BoldIcon className="icon" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}>
          <ItalicIcon className="icon" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}>
          <StrikethroughIcon className="icon" />
        </button>
      </div>

      <div className="editor-buttons__group">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}>
          <BulletIcon className="icon" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}>
          <OrderedIcon className="icon" />
        </button>
      </div>

      <div className="editor-buttons__group">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}>
          <UndoIcon className="icon" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}>
          <RedoIcon className="icon" />
        </button>
      </div>
    </div>
  )
}

const RichTextEditor = ({ form, text, wrapperClass = '' }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: ``,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      form.setFieldValue('details', html)
    },
  })

  return (
    <div className={wrapperClass}>
      <label>{text}</label>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor
