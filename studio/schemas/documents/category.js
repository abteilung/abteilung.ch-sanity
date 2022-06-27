import { MdOutlineCategory } from 'react-icons/md'


export default {
  name: 'category',
  title: 'Categories',
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