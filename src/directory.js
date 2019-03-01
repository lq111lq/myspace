export const sections = []
export const articles = []
export const components = {}

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
    section,
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
  components[id] = component
}

addSection('算法与数据结构', '#FF4B4B')

addArticle('排序', 'article-sorter', () => import('@/components/article/sorter/Index.vue'))
addArticle('平衡二叉树', 'article-avl-tree', () => import('@/components/article/AvlTree.vue'))

addSection('SVG', '#FF8F42')
addArticle('LINE', 'article-line', {
  render (h) {
    return h('div', 'article-line')
  }
})
addArticle('PATH', 'article-path', {
  render (h) {
    return h('div', 'article-path')
  }
})
