import { MdProductionQuantityLimits } from 'react-icons/md'

export default {
  name: 'product',
  title: 'Products',
  type: 'document',
  icon: MdProductionQuantityLimits,
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
      name: 'teaser',
      title: 'Teaser',
      type: 'blockContent',
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
      name: 'productIcon',
      title: 'Product Icon',
      type: 'image',
      options: {
        hotspot: false,
      },
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
