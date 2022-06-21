// helpArticle.js
export default {
  name: 'helpArticle',
  title: 'Help article',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'faqs',
      type: 'array',
      title: 'Frequently Asked Questions',
      of: [
        {
          type: 'faq'
        }
      ]
    }
  ]
}

