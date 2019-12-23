const enhanceProduct = (productResponse) => {
  const _variants = productResponse.data.products.results.map((product) => {
    const current = product.masterData.current

    return current.allVariants.map((variant) => ({
      ...variant,
      _name: current.name,
      _slug: current.slug,
      _master: current.masterVariant.id === variant.id,
      _categoriesRef: current.categoriesRef.map(cr => cr.id)
    }))
  }).reduce((prev, curr) => ([...prev, ...curr]), [])

  return {
    ...productResponse,
    data: {
      ...productResponse.data,
      _variants
    }
  }
}

export default enhanceProduct
