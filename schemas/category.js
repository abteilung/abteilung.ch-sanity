import { MdOutlineCategory } from 'react-icons/md'


export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: MdOutlineCategory,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}