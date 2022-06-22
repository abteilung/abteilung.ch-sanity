import { MdOutlineCases } from 'react-icons/md'


export default {
  name: 'casestudy',
  title: 'Case Studies',
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
      description: "💡 highest quality possible without upscaling the image (up to 2500px).",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Accessibility label for the image",
          description:
            'Help make the site more accessible & SEO-friendly with a short textual description of the image, such as "screenshot of the dashboard app"',
          type: "string",
          validation: Rule => Rule.required(),
          options: {
            isHighlighted: true,
          },
        },
      ],      
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
      of: [{type: 'reference', to: {type: 'categoryReference'}}],
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
