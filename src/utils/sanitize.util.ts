const removeAttrFromObject = <O extends object, A extends keyof O>(
  object: O,
  attr: A
): Omit<O, A> => {
  const res = { ...object }
  if (attr in res) {
    delete res[attr]
  }
  return res
}

export {
  removeAttrFromObject
}