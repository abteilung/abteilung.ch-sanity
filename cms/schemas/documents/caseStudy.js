import { MdOutlineCases } from 'react-icons/md'


export default {
  name: 'casestudy',
  title: 'Case Study',
  type: 'document',
  icon: MdOutlineCases,
  fields: [
    {
      name: 'subtitle',
      title: 'eyebrow (H1)',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'youtube',
      title: 'Youtube-Movie',
      type: 'url',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'categoryProduct'}}],
    },
    {
      name: 'productReferences',
      title: 'Product References',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}, {type: 'service'}] }],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'title',
      subTitle: 'subtitle',
      media: 'mainImage',
    },
    prepare(selection) {
      const {subTitle} = selection
      return Object.assign({}, selection, {
        subtitle: subTitle && `${subTitle}`,
      })
    },
  },
}
