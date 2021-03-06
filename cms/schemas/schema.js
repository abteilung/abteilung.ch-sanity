// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './array/blockContent'
import category from './documents/category'
import categoryProduct from './documents/categoryProduct'
import categoryReference from './documents/categoryReference'
import page from './documents/page'
import caseStudy from './documents/caseStudy'
import post from './documents/post'
import product from './documents/product'
import service from './documents/service'
import author from './documents/author'
import gallery from './objects/gallery'
import faq from './objects/faq'
import navigation from './documents/navigation'
import navItem from './objects/navItem'
import generalSettings from './documents/settings-general'
import link from './objects/link'


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    generalSettings,
    page,
    post,
    category,
    product,
    categoryProduct,
    service,
    caseStudy,
    categoryReference,
    author,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    gallery,
    faq,
    navigation,
    navItem,
    link,
  ]),
})
