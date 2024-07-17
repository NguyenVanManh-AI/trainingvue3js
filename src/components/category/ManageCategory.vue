<template>
  <div id="manage-category" class="p-6">
    Manage Category
    <div style="display: flex;justify-content: end;" class="mb-2">

      <!-- Search, sort, paginate -->
      <div class="pl-0 pr-1" id="page">
        <select content="Pagination" v-tippy class="form-control " v-model="big_search.perPage">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div class="pl-0 mr-3">
        <select content="Sort by" v-tippy class="form-control " v-model="big_search.typesort">
          <option value="new">New</option>
          <option value="title">Name</option>
        </select>
      </div>
      <div class="pl-0 mr-3">
        <select content="In direction" v-tippy class="form-control " v-model="big_search.sortlatest">
          <option value="false">Ascending</option>
          <option value="true">Decrease</option>
        </select>
      </div>
      <div class="pl-0 ">
        <div content="Search information content" v-tippy class="input-group">
          <div class="input-group-prepend">
            <div class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></div>
          </div>
          <input v-model="search" type="text" class="form-control " id="inlineFormInputGroup" placeholder="Search...">
        </div>
      </div>
      <!-- Search, sort, paginate -->


      <button content="Add Category" v-tippy type="button" class="btn btn-primary" data-toggle="modal"
        data-target="#addCategory">
        <i class="fa-solid fa-plus"></i>
      </button>

      <div class="pr-0 mr-3 ml-3" v-if="selectedCategorys.length > 0">
        <div class="input-group">
          <button @click="deleteManyCategory()" content="Delete Many Content" v-tippy data-toggle="modal"
            data-target="#deleteManyCategory" type="button" class="btn btn-outline-danger mr-1 form-control"><i
              class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      <TableLoading :cols="6" :rows="9"></TableLoading>
    </div>
    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col"><input ref="selectAllCheckbox" @change="selectAll()" type="checkbox" class=""></th>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Search Number</th>
            <th scope="col">Tag</th>
            <th scope="col">Thumbmail</th>
            <th scope="col">Created at</th>
            <th scope="col">Updated at</th>
            <th scope="col">Feature</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories" :key="index">
            <th class="table-cell" scope="row"><input :checked="isSelected(category.id)" type="checkbox" class=""
                @change="handleSelect(category.id)"></th>
            <th scope="row">{{ category.id }}</th>
            <td><li><router-link :to="{ name: 'DetailPageCategory', params: { id_category: category.id } }">{{ category.title }}</router-link></li></td>
            <td>{{ category.description }}</td>
            <td>{{ category.search_number }}</td>
            <td>{{ JSON.stringify(category.tag) }}</td>
            <td><img style="max-width: 100px;" :src="config.URL + category.thumbnail" alt=""></td>
            <td>{{ helper.formatDate(category.created_at) }}</td>
            <td>{{ helper.formatDate(category.updated_at) }}</td>
            <td style="display: flex;">
              <button content="Detail Category" v-tippy @click="selectCategory(category)" data-toggle="modal"
                data-target="#detailCategory" type="button" class="btn btn-outline-success mr-2"><i class="fa-solid fa-eye"></i></button>
              <button content="Update Category" v-tippy @click="selectCategory(category)" data-toggle="modal"
                data-target="#updateCategory" type="button" class="btn btn-outline-primary mr-2"><i
                  class="fa-solid fa-pen-nib"></i></button>
              <button content="Delete Category" v-tippy @click="selectCategory(category)" data-toggle="modal"
                data-target="#deleteCategory" type="button" class="btn btn-outline-danger"><i
                  class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="divpaginate" class="mt-2">
      <paginate v-if="paginateVisible" :page-count="last_page" :page-range="3" :margin-pages="2"
        :click-handler="clickCallback" :initial-page="big_search.page" :prev-text="'Prev'" :next-text="'Next'"
        :container-class="'pagination'" :page-class="'page-item'">
      </paginate>
    </div>

    <AddCategory></AddCategory>
    <UpdateCategory :config="config"></UpdateCategory>
    <DetailCategory :config="config"></DetailCategory>
    <DeleteCategory :config="config"></DeleteCategory>
    <DeleteManyCategory :selectedCategorys="selectedCategorys"></DeleteManyCategory>
  </div>
</template>

<script>

// import Paginate from 'vuejs-paginate-next';
import UserRequest from '@/restful/UserRequest';
import useEventBus from '@/composables/useEventBus';
const { emitEvent, onEvent } = useEventBus();
import config from '@/config';
import TableLoading from '@/components/common/TableLoading'
import _ from 'lodash';
import helper from '@/helper'
import AddCategory from '@/components/category/AddCategory'
import UpdateCategory from '@/components/category/UpdateCategory'
import DetailCategory from '@/components/category/DetailCategory'
import DeleteCategory from '@/components/category/DeleteCategory'
import DeleteManyCategory from '@/components/category/DeleteManyCategory'
import Paginate from 'vuejs-paginate-next';

export default {
  name: 'ManageCategory',
  data() {
    return {
      total: 0,
      last_page: 1,
      paginateVisible: true,
      search: '',
      big_search: {
        perPage: 5,
        page: 1,
        typesort: 'new',
        sortlatest: 'true',
      },
      query: '',

      categories: null,
      config: config,
      helper: helper,
      isLoading: false,
      selectedCategory: null,
      selectedCategorys: [],
    }
  },
  components: {
    paginate: Paginate,
    TableLoading,
    AddCategory,
    UpdateCategory,
    DeleteCategory,
    DeleteManyCategory,
    DetailCategory,
  },
  props: {

  },

  mounted() {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    this.search = searchParams.get('search') || '';
    this.big_search = {
      perPage: parseInt(searchParams.get('paginate')) || 5,
      page: searchParams.get('page') || 1,
      typesort: searchParams.get('typesort') || 'new',
      sortlatest: searchParams.get('sortlatest') || 'true',
    }
    this.getCategories();

    onEvent('eventRegetCategories', () => {
      this.getCategories();
    });
  },

  methods: {
    isSelected(categoryId) {
      return this.selectedCategorys.includes(categoryId);
    },
    handleSelect: function (categoryId) {
      const index = this.selectedCategorys.indexOf(categoryId);
      if (index === -1) this.selectedCategorys.push(categoryId);
      else this.selectedCategorys.splice(index, 1);
    },
    selectAll: function () {
      const checkbox = this.$refs.selectAllCheckbox;
      if (checkbox.checked) this.selectedCategorys = this.categories.map(category => category.id);
      else this.selectedCategorys = [];
    },
    deleteManyCategory: function () {
      emitEvent('selectManyContent', this.categories);
    },

    selectCategory: function (category) {
      this.selectedCategory = category;
      emitEvent('eventSelectCategory', this.selectedCategory);
    },
    getCategories: async function () {
      this.selectedCategorys = [];
      this.isLoading = true;
      this.query = '?search=' + this.search + '&typesort=' + this.big_search.typesort + '&sortlatest=' + this.big_search.sortlatest
        + '&paginate=' + this.big_search.perPage + '&page=' + this.big_search.page;
      window.history.pushState({}, null, this.query);
      try {
        const { data } = await UserRequest.get('category' + this.query, false)
        this.categories = data.data;
        this.total = data.total;
        this.last_page = data.last_page;
        this.isLoading = false;
        // emitEvent('eventSuccess', messages[0]);
        console.log(this.categories);
      }
      catch (error) {
        if (error.messages) emitEvent('eventError', error.messages[0]);
        this.isLoading = false;
      }
      this.reRenderPaginate();
    },
    reRenderPaginate: function () {
      if (this.big_search.page > this.last_page) this.big_search.page = this.last_page;
      this.paginateVisible = false;
      this.$nextTick(() => { this.paginateVisible = true; });
    },
    clickCallback: function (pageNum) {
      this.big_search.page = pageNum;
    },
  },
  watch: {
    big_search: {
      handler: function () {
        this.getCategories();
      },
      deep: true
    },
    search: _.debounce(function () {
      console.log(this.search);
      this.getCategories();
    }, 500),
  }
}
</script>

<style></style>