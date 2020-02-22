function $(sel, parent = document) {
  return parent.querySelector(sel)
}

$.all = (sel, parent = document) => parent.querySelectorAll(sel);

export {
  $
}
