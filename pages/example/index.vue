<template>
  <div class="main-container">
    <div>
      <h1 class="title">
        {{ $t('home.title') }} {{ env }}
      </h1>
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

    <phone-num-input
      v-model="phone"
      title="Phone No."
      :required="true"
      @prefix="onChangedPrefixNumber"
    />

    <t1-button @click.native="changeIsModal">
      Modal
    </t1-button>
    <modal v-show="isModal" @close="changeIsModal">
      <template v-slot:header>
        Want to create new company ?
      </template>

      <template v-slot:body>
        You have create the company information. Please
        check the information before click to create partner
        button.
      </template>

      <template v-slot:footer>
        <t1-button
          class="transparent modal-btn"
          @click.native="changeIsModal"
        >
          Cancel
        </t1-button>
        <t1-button
          class="modal-btn"
          @click.native="changeIsModal"
        >
          Confirm
        </t1-button>
      </template>
    </modal>
    <upload-image title="Brand Logo" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BreadcrumbType } from '~/constants'
import T1Button from '@/components/atoms/button.vue'
import Modal from '@/components/atoms/Modal.vue'
import UploadImage from '@/components/molecules/UploadImage.vue'
import PhoneNumInput from '@/components/atoms/PhoneNumInput.vue'

@Component({
  components: {
    T1Button,
    Modal,
    UploadImage,
    PhoneNumInput
  }
})
export default class Main extends Vue {
  private products = []
  private isModal = false
  private phone = ''
  private prefix = ''

  get env() {
    return process.env.TEST
  }

  get todos() {
    return this.$store.state.todos.list
  }

  private changeIsModal(): void {
    this.isModal = !this.isModal
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

  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: 'Company list',
        url: '/'
      },
      {
        title: 'Create new company',
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch(
      'breadcrumb/setBreadcrumb',
      breadcrumb
    )

    //set Page title
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      'Create new company'
    )
  }

  //need to be function to received emit event
  onChangedPrefixNumber(value: string): void {
    this.prefix = value
  }

  mounted(): void {
    this.setupBreadcrumb()
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
  flex-direction: column;
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

.modal-btn {
  margin-left: 25px;
  width: 86px;
}
</style>
