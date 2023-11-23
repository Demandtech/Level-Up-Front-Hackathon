'use strict'

const getElement = (selector) => document.querySelector(selector)
const getElements = (selector) => document.querySelectorAll(selector)

const userMenuBtn = getElement('.user-control-btn')
const dropdownMenu = getElement('.dropdown-menu')
const dropdownList = getElements('.list-item')
const notificationBtn = getElement('.notification')
const notificationDropdown = getElement('.dropdown-notification')
const trialCloseBtn = getElement('.trial-close-btn')
const trialWrapper = getElement('.trial-wrapper')
const guideCardHeaders = getElements('.item-header')
const guideContentWrappers = getElements('.content-wrapper')
const guideContents = getElements('.item-content')
const statusBtns = getElements('.status-btn')
const contentItems = getElements('.content-item')
const collapseBtn = getElement('.collapse-btn')
const plansContentWrapper = getElement('.plans-content')
const collapseSvg = getElement('.collapse')
const unCollapseSvg = getElement('.uncollapse')
const progressThumb = getElement('.progress-thumb')
const progressCount = getElement('.progress_count')

let isDropdownOpen = false
let progress = 1
let progressWidth = 20

const toggleDropdown = (
  dropdown,
  triggerBtn,
  otherDropdown,
  otherTriggerBtn
) => {
  if (dropdown.classList.contains('open-dropdown')) {
    dropdown.classList.remove('open-dropdown')
    triggerBtn.classList.remove('open')
  } else {
    dropdown.classList.add('open-dropdown')
    otherDropdown.classList.remove('open-dropdown')
    triggerBtn.classList.add('open')
    otherTriggerBtn.classList.remove('open')
  }
}

const handleDropdownItemClick = (item) => {
  dropdownList.forEach((li) => li.classList.remove('active'))
  item.classList.add('active')
}

userMenuBtn.addEventListener('click', () => {
  toggleDropdown(
    dropdownMenu,
    userMenuBtn,
    notificationDropdown,
    notificationBtn
  )
})

dropdownList.forEach((item) => {
  item.addEventListener('click', () => {
    handleDropdownItemClick(item)
  })
})

notificationBtn.addEventListener('click', () => {
  toggleDropdown(
    notificationDropdown,
    notificationBtn,
    dropdownMenu,
    userMenuBtn
  )
})

trialCloseBtn.addEventListener('click', () => {
  trialWrapper.classList.add('hide-trial-plan')
})

guideContents[0].style.height = `120px`
contentItems[0].classList.add('active-collapse')

guideCardHeaders.forEach((item, index_out) => {
  item.addEventListener('click', (e) => {
    const clickedButton = e.target.closest('.status-btn')
    if (clickedButton) {
      if (clickedButton.classList.contains('completed')) {
        progress > 1 ? (progress -= 1) : (progress = 1)
        progressWidth > 20 ? (progressWidth -= 20) : (progressWidth = 20)
      } else {
        progress < 5 ? (progress += 1) : (progress = 5)
        progressWidth < 100 ? (progressWidth += 20) : (progressWidth = 100)
        const nextIndex = index_out + 1
        const nextCardButton = guideCardHeaders[nextIndex]
        if (nextCardButton) {
          nextCardButton.click()
        }
      }

      progressCount.textContent = progress
      progressThumb.setAttribute('width', `${progressWidth}%`)
      clickedButton.classList.toggle('completed')
    } else {
      guideCardHeaders.forEach((li) => li.classList.remove('item-collapse'))
      guideContents.forEach((con) => (con.style.height = 0))
      contentItems.forEach((con) => con.classList.remove('active-collapse'))
      guideContents[index_out].style.height =
        guideContentWrappers[index_out].offsetHeight + 'px'
      item.classList.add('item-collapse')
      contentItems[index_out].classList.add('active-collapse')
    }
  })
})

collapseBtn.addEventListener('click', () => {
  if (plansContentWrapper.classList.contains('plans-content-collapse')) {
    plansContentWrapper.classList.remove('plans-content-collapse')
    collapseSvg.style.display = 'block'
    unCollapseSvg.style.display = 'none'
  } else {
    plansContentWrapper.classList.add('plans-content-collapse')
    collapseSvg.style.display = 'none'
    unCollapseSvg.style.display = 'block'
  }
})
