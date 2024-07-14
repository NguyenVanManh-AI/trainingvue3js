<template>
  <div id="manage-category" class="p-6">
    Manage Category
    <div v-if="isLoading">
      <TableLoading :cols="6" :rows="9"></TableLoading>
    </div>
    <div>
      <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Search Number</th>
      <th scope="col">Tag</th>
      <th scope="col">Thumbmail</th>
      <th scope="col">Created at</th>
      <th scope="col">Updated at</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(category, index) in categories" :key="index">
      <th scope="row">{{ index }}</th>
      <td>{{category.title}}</td>
      <td>{{ category.description }}</td>
      <td>{{ category.search_number }}</td>
      <td>{{ JSON.stringify(category.tag) }}</td>
      <td><img style="max-width: 100px;" :src="config.URL + category.thumbnail" alt=""></td>
      <td>{{ helper.formatDate (category.created_at) }}</td>
      <td>{{ helper.formatDate (category.updated_at) }}</td>
    </tr>
  </tbody>
</table>
    </div>
  </div>
</template>

<script>

import useEventBus from '@/composables/useEventBus'
import UserRequest from '@/restful/UserRequest';
const { emitEvent } = useEventBus();
// import Paginate from 'vuejs-paginate-next';
import config from '@/config';
import TableLoading from '@/components/common/TableLoading'
// import _ from 'lodash';
import helper from '@/helper'

export default {
  name: 'ManageCategory',
  data() {
    return {
      categories: null,
      config: config,
      helper: helper,
      total: 0,
      last_page: 1,
      isLoading: false,
    }
  },
  components: {
    // paginate: Paginate,
    TableLoading,
    // DeleteContent,
    // DeleteManyContent,
    // DetailContent,
    // AddOrUpdateContent,
  },
  props: {

  },

  mounted() {
    this.getCategories();
  },

  methods: {
    getCategories: async function () {
      this.isLoading = true;
      try {
        const { data, messages } = await UserRequest.get('category?paginate=20', false)
        this.categories = data.data;
        this.total = data.total;
        this.last_page = data.last_page;
        this.isLoading = false;
        emitEvent('eventSuccess', messages[0]);
        console.log(this.categories);
      }
      catch (error) {
        if (error.messages) emitEvent('eventError', error.messages[0]);
        this.isLoading = false;
      }
    },
  },

  setup() {

  },
  beforeCreate() {

  },
  created() {

  },
  beforeMount() {

  },

  beforeUpdate() {

  },
  updated() {

  },
  beforeUnmount() {

  },
  unmounted() {

  }
}
</script>

<style></style>