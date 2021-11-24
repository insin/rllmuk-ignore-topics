let contextMenuId
let showIgnoredTopics

chrome.storage.local.get((config) => {
  showIgnoredTopics = config.showIgnoredTopics || false
  contextMenuId = chrome.contextMenus.create({
    type: 'checkbox',
    title: 'Show ignored topics',
    checked: showIgnoredTopics,
    onclick: () => {
      chrome.storage.local.set({showIgnoredTopics: !showIgnoredTopics})
    },
    documentUrlPatterns: [
      'https://www.rllmukforum.com/index.php?/discover/unread/*',
      'https://www.rllmukforum.com/index.php?/forum/*',
      'https://www.rllmukforum.com/index.php?/forumId=*',
    ],
  })

  chrome.storage.onChanged.addListener((changes) => {
    if ('showIgnoredTopics' in changes) {
      showIgnoredTopics = changes['showIgnoredTopics'].newValue
      chrome.contextMenus.update(contextMenuId, {
        checked: showIgnoredTopics,
      })
    }
  })
})
