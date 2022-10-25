/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const sections = document.querySelectorAll("section");
// list acts the <ul> tag in HTML in nav
let list = document.querySelector("#navbar__list");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function itemIdFromSectionId(sectionId) {
  return sectionId.replace(/\bsection/gi, "item");
}
function sectionIdFromItemId(itemId) {
  return itemId.replace(/\bitem/gi, "section");
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
//first way by dom methods no html code !(innerHTML)method
/* function createNavList() {
    sections.forEach((section) => {
      let newItem = document.createElement("li");
      let link = document.createElement("a");
      link.classList.add("menu__link");
      link.setAttribute("href", `#${section.id}`);
      //https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
      link.innerHTML = section.dataset.nav;
      newItem.appendChild(link);
      list.appendChild(newItem);
    });
  } */
createNavList();
// Another way by html code it is more readable (innerHTML)method
function createNavList() {
  let htmlCode = "";

  sections.forEach((sec) => {
    htmlCode += `<li class="list"><a id="${itemIdFromSectionId(
      sec.id
    )}" class="menu__link" class="">${sec.dataset.nav}</a>`;
  });
  list.innerHTML = htmlCode;
}

// Add class 'active' to section when near top of viewport

// Set sections as active
function sectionActivation(section) {
  let secId = section.getAttribute("id");
  let sec = document.getElementById(`${secId}`);
  sec.classList.add("your-active-class");
  document
    .querySelector(`#${itemIdFromSectionId(secId)}`)
    .classList.add("your-active-class");
}
// remove active from sections
function sectionDeactivation(section) {
  let secId = section.getAttribute("id");
  let sec = document.getElementById(`${secId}`);
  sec.classList.remove("your-active-class");
  document
    .querySelector(`#${itemIdFromSectionId(secId)}`)
    .classList.remove("your-active-class");
}

//https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
/**The Element.getBoundingClientRect() method returns a DOMRect object
 * providing information about the size of an element and its position relative
 * to the viewport. */
function updateSectionState() {
  sections.forEach((sec) => {
    if (
      sec.getBoundingClientRect().top <= 150 &&
      sec.getBoundingClientRect().bottom >= 150
    )
      sectionActivation(sec);
    else sectionDeactivation(sec);
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Scroll to section on link click
list.addEventListener("click", (evt) => {
  evt.preventDefault();
  let target = evt.target;
  if (target.className === "menu__link") {
    targetSection = document.querySelector(
      `#${sectionIdFromItemId(target.id)}`
    );
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
});

// Scroll to anchor ID using scrollTO event
document.addEventListener("scroll", updateSectionState);


//(draft)
// some functions I have learned but I have no longer need it in my project 
/*
list.addEventListener(
  "mouseover",
  (evt) => {
    evt.preventDefault();
    let target = evt.target;
    if (target.className === "menu__link") {
      targetSection = document.querySelector(
        `#${sectionIdFromItemId(target.id)}`
      );
      target.style.background = "#333";
      setTimeout(() => {
        target.style.color = "";
      }, 500);
    }
  },
  false
);

list.addEventListener("blur", (evt) => { // vs 'focus'
  evt.preventDefault();
  let target = evt.target;
  if (target.className === "menu__link") {
    targetSection = document.querySelector(
      `#${sectionIdFromItemId(target.id)}`
    );
    target.style.background = "";
  }
});
*/
