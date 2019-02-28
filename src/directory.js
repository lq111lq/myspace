export const sections = []
export const articles = []

let section
function addSection (sectionName, color) {
  var newSection = {
    name: sectionName,
    color,
    articles: []
  }
  section = newSection
  sections.push(section)
  articles.push({
    type: 'section',
    name: sectionName,
    color
  })
}

function addArticle (title, id, component) {
  section.articles.push({
    title,
    id,
    component
  })
  articles.push({
    type: 'article',
    title,
    id,
    color: section.color,
    component
  })
}

addSection('算法与数据结构', '#FF4B4B')
addArticle('二叉树', 'a')
addArticle('平衡二叉树', 'b')

addSection('SVG', '#FF8F42')
addArticle('LINE', 'c')
addArticle('PATH', 'd')
