import { MdArrowDropDown } from 'react-icons/md'

export default {
  title: 'Accordion List',
  name: 'accordions',
  type: 'object',
  icon: MdArrowDropDown,
  fields: [
    {
      title: 'Accordions',
      name: 'items',
      type: 'array',
      of: [{ type: 'accordion' }]
    }
  ],
  preview: {
    select: {
      items: 'items'
    },
    prepare({ items }) {
      return {
        title: 'Accordion List',
        subtitle: `${items.length} item(s)`
      }
    }
  }
}