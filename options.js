let form = document.querySelector('form')

/** @type {import("./types").Config} */
let optionsConfig = {
  hideFluidSidebar: false,
  showIgnoredTopics: false,
}

chrome.storage.local.get((storedConfig) => {
  Object.assign(optionsConfig, storedConfig)

  for (let prop in optionsConfig) {
    if (prop in form.elements) {
      form.elements[prop].checked = optionsConfig[prop]
    }
  }

  form.addEventListener('change', (e) => {
    let {name, checked} = /** @type {HTMLInputElement} */ (e.target)
    optionsConfig[name] = checked
    chrome.storage.local.set({[name]: checked})
  })
})

chrome.storage.onChanged.addListener((changes) => {
  for (let prop in changes) {
    optionsConfig[prop] = changes[prop].newValue
    if (prop in form.elements) {
      form.elements[prop].checked = optionsConfig[prop]
    }
  }
})
