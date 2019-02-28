<template>
  <nav class="navigation">
    <ul
      v-for="(section, i) in sections"
      :key="i"
      :class="{active: isActive (section)}"
      :style="{
        color: isActive (section) ? section.color : '',
        height: isActive (section) ? (40 + section.articles.length * 20) + 'px' : '40px'
      }"
    >
      <li :class="{active: isActive (section)}">
        <a
          :href="'#' + section.articles[0].id"
          @click.prevent="handleLinkClisk(section.articles[0].id)"
        >{{section.name}}</a>
      </li>
      <li
        v-for="(article, j) in section.articles"
        :key="i + '-' + j"
        :class="{active: article.id === app.hash}"
      >
        <a
          :href="'#'+article.id"
          @click.prevent="handleLinkClisk(article.id)"
        >{{article.title}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {sections} from '@/directory.js'
export default {
  name: 'DirectoryNav',
  inject: ['app'],
  data () {
    return {
      sections
    }
  },
  methods: {
    isActive (section) {
      return section.articles.find((d) => {
        return d.id === this.app.hash
      })
    },
    handleLinkClisk (articleId) {
      this.$emit('articleSelected', articleId)
    }
  }
}
</script>

<style scoped>
.navigation {
  overflow-y: auto;
  width: 100%;
  padding: 10px 0 20px 20px;
}

.navigation ul {
  margin: 0;
  opacity: .4;
  list-style-type: none;
  padding-left: 0px;
  overflow-y: hidden;
  color: white;
  transition: all .4s ease;
  transition-delay: .0s;
}

.navigation ul.active {
  opacity: 1;
  transition-delay: .6s;
}

.navigation ul:hover {
  opacity: 1;
}

.navigation ul li {
  position: relative;
}

.navigation ul li:before {
  content: "";
  display: block;
  position: absolute;
  top: 4px;
  left: 0px;
  width: 1px;
  height: calc(100% - 8px);
  background-color: white;
}

.navigation ul li a {
  display: block;
  padding-left: 10px;
  color: white;
  text-decoration: none;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .5px;
  color: white;
}

.navigation ul li.active:before {
  background-color: currentColor;
}

.navigation ul li.active a {
  color: currentColor;
}

.navigation ul li:first-child a {
  padding-left: 0;
  padding-top: 10px;
  padding-bottom: 10px;
}

.navigation ul li:first-child:before {
  display: none;
}
</style>
