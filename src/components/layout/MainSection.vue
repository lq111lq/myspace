<template>
  <section ref="section">
    <template v-for="(article, i) in articles" >
      <article
        v-if="article.type === 'section'"
        :key="i"
        :class="article.type"
        :style="{color: article.color}"
      >
        <span>{{article.name}}</span>
      </article>
      <article
        v-if="article.type === 'article'"
        :key="i"
        :id="article.id"
        :ref="article.id"
        :class="article.type"
        :style="{color: article.color}"
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
    scrollTo (articleId) {
      let section = this.$refs['section']
      let article = this.$refs[articleId][0]
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
  border-bottom: 1px solid rgba(0,0,0,.65);
}

article.section {
  position: sticky;
  background-color: #252423;
  top: 0;
  height: 60px;
  line-height: 60px;
  font-size: 16px;
}

article.article {
  height: calc(100vh - 60px);
}
</style>
