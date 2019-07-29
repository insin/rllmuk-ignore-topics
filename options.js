let form = document.querySelector('form')

let config = {
  showIgnoredTopics: false,
  topicLinksLatestPost: true,
}

chrome.storage.local.get((storedConfig) => {
  Object.assign(config, storedConfig)

  for (let prop in config) {
    if (prop in form.elements) {
      form.elements[prop].checked = config[prop]
    }
  }

  form.addEventListener('change', (e) => {
    let {name, checked} = e.target
    config[name] = checked
    chrome.storage.local.set({[name]: checked})
  })
})

chrome.storage.onChanged.addListener((changes) => {
  for (let prop in changes) {
    config[prop] = changes[prop].newValue
    if (prop in form.elements) {
      form.elements[prop].checked = config[prop]
    }
  }
})
