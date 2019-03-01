<template>
  <section ref="section">
    <template v-for="(article, i) in articles" >
      <article
        class="section"
        v-if="article.type === 'section'"
        :key="i"
        :style="{color: isActive(article.section) ? article.color : ''}"
      >
        <span>{{article.name}}</span>
      </article>
      <article
        class="article"
        v-if="article.type === 'article'"
        :key="i"
        :id="article.id"
        :ref="article.id"
        :style="{color: app.hash === article.id ? article.color : ''}"
      >
        <component :is="article.id"></component>
      </article>
    </template>
  </section>
</template>

<script>
import {articles, components} from '@/directory.js'
import anime from 'animejs'

console.log(components)

export default {
  name: 'MainSection',
  inject: ['app'],
  data () {
    return {
      articles
    }
  },
  components,
  methods: {
    isActive (section) {
      return section.articles.find((d) => {
        return d.id === this.app.hash
      })
    },
    scrollTo (articleId) {
      if (!this.$refs[articleId]) {
        return
      }
      let section = this.$refs['section']
      let article = this.$refs[articleId][0]
      article.focus()
      anime({
        targets: {
          scroll: section.scrollTop
        },
        scroll: article.offsetTop - 60,
        duration: 500,
        easing: 'easeInOutQuart',
        update: (a) => {
          section.scrollTop = a.animations[0].currentValue
        }
      })
    }
  }
}
</script>

<style scoped>
section {
  width: calc(100% - 240px);
  height: 100%;
  position: absolute;
  top: 0;
  left: 240px;
  overflow: hidden;
}

article {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  color: white;
  transition: color .4s ease;
  transition-delay: .5s;
}

article.section {
  position: sticky;
  z-index: 10;
  background-color: #252423;
  top: 0;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  border-bottom: 1px solid rgba(0,0,0,.65);
}

article.article {
  height: calc(100vh - 60px);
  padding: 20px 20px;
  overflow-x: hidden;
  overflow-y: auto;
}

.article.article::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
}

.article.article::-webkit-scrollbar-track {
  background-color: rgba(0,0,0,.65);
}

.article.article::-webkit-scrollbar-thumb {
  background-color: rgba(255,255,255,.3);
}

.article.article::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255,255,255,.6);
}
</style>
