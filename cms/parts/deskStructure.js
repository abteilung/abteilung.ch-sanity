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
