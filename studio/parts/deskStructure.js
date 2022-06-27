// import S from '@sanity/desk-tool/structure-builder'
// import { MdSettings } from 'react-icons/md';

// export default () =>
//   S.list()
//     .title('Content')
//     .items([
//       S.listItem()
//         .title('Site Settings')
//         .icon(MdSettings)
//         .child(
//           S.document()
//             .schemaType('siteSettings')
//             .documentId('siteSettings')
//             .title("Site Settings")
//         ),
//       ...S.documentTypeListItems().filter(listItem => !['siteSettings', 'media.tag'].includes(listItem.getId()))
//     ])


// deskStructure.js
import S from '@sanity/desk-tool/structure-builder'
import {createDeskHierarchy} from '@sanity/hierarchical-document-list'

export default () => {
  return S.list()
    .title('Contents')
    .items([
      ...S.documentTypeListItems(), // or whatever other structure you have
      createDeskHierarchy({
        title: 'Main table of contents',

        // The hierarchy will be stored in this document ID 👇
        documentId: 'main-table-of-contents',

        // Document types editors should be able to include in the hierarchy
        referenceTo: ['post', 'story', 'casestudy'],

        // ❓ Optional: provide filters and/or parameters for narrowing which documents can be added
        // referenceOptions: {
        //   filter: 'status in $acceptedStatuses',
        //   filterParams: {
        //     acceptedStatuses: ['published', 'approved']
        //   }
        // },

        // ❓ Optional: limit the depth of your hierarachies
        maxDept: 3
      })
    ])
}
