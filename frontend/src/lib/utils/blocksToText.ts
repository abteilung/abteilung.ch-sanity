const blocksToText = (blocks: Sanity.Schema.BlockContent, removeNonText = true) => {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return removeNonText ? '' : `[${block._type} block]`
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

export { blocksToText };
