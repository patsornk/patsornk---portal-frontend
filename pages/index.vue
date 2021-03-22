<template>
  <div class="main-container">
    <div>
      <h1 class="title">
        {{ $t('home.title') }} {{ env }}
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
        <button
          href="#"
          class="button--grey"
          @click.prevent="
            $i18n.setLocale(
              $i18n.locale === 'en' ? 'th' : 'en'
            )
          "
        >
          change lang
        </button>
      </div>
      <div class="flex">
        <div class="flex w-full justify-center">
          <ul>
            <li
              v-for="(todo, index) in todos"
              :key="todo.text + index"
            >
              <input
                :checked="todo.done"
                @change="toggle(todo)"
                type="checkbox"
              />
              <span :class="{ done: todo.done }">{{
                todo.text
              }}</span>
            </li>
            <li>
              <input
                @keyup.enter="addTodo"
                placeholder="What needs to be done?"
              />
            </li>
          </ul>
        </div>
        <div class="flex w-full justify-center flex-col">
          <span
            class="secondary"
            v-for="(product, index) in products"
            :key="index"
          >
            {{ product.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Main extends Vue {
  private products = []
  $i18n: any

  get env() {
    return process.env.TEST
  }

  get todos() {
    return this.$store.state.todos.list
  }

  private toggle(todo: string) {
    this.$store.commit('todos/toggle', todo)
  }

  private addTodo(e: any) {
    this.$store.commit('todos/add', e.target.value)
    e.target.value = ''
  }

  async fetchData(): Promise<void> {
    const resp = await this.$axios.$get(
      'https://reqres.in/api/products'
    )
    this.products = resp.data
  }

  mounted(): void {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
@import '@/assets/scss/_variables.scss';

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: $primary;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: $primary;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
