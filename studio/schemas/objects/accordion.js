import { MdArrowDro } from 'react-icons/md'

export default {
  title: 'Accordion',
  name: 'accordion',
  type: 'object',
  icon: MdArrowDro,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Content',
      name: 'content',
      type: 'simplePortableText'
    }
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
}
