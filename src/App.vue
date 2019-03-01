<template>
  <div id="app" class="animated fadeIn">
    <section class="sidebar">
      <header class="header">
        <a class="logo" href="#">
          <img src="@/assets/logo.png">
        </a>
      </header>
      <directory-nav @articleSelected="handleArticleSelected"></directory-nav>
    </section>
    <main-section ref="MainSection"></main-section>
  </div>
</template>

<script>
import DirectoryNav from '@/components/layout/DirectoryNav'
import MainSection from '@/components/layout/MainSection'
export default {
  name: 'App',
  data () {
    return {
      hash: ''
    }
  },
  provide () {
    return {
      app: this
    }
  },
  components: {
    DirectoryNav,
    MainSection
  },
  methods: {
    handleArticleSelected (articleId) {
      this.hash = articleId
      this.$refs.MainSection.scrollTo(articleId)
      window.history.pushState(null, null, '#' + articleId)
    }
  },
  beforeMount () {
    this.hash = window.location.hash.substring(1)
    window.addEventListener('hashchange', () => {
      this.hash = window.location.hash.substring(1)
    })
  },
  mounted () {
    let hash = window.location.hash.substring(1)
    this.$refs.MainSection.scrollTo(hash)
  }
}
</script>

<style scoped>
/* app */
#app {
  height: 100%;
}

/* Sidebar */
.sidebar {
  width: 240px;
  height: 100%;
  border-right: 1px solid rgba(0,0,0,.65);
}
.sidebar .header {
  width: 239px;
  height: 60px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid rgba(0,0,0,.65);
}

.sidebar .header .logo {
  display: inline-block;
  width: 110px;
  height: 30px;
  overflow: hidden;
}

.sidebar .header .logo img {
  height: 95px;
  margin-top: -13px;
  margin-left: -8px;
}
</style>
