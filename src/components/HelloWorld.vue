<template>
  <div class="hello">
    <!-- <img :src="imageSrc" :alt="img_alt" :placeholder="img_alt"> -->

    <p :class="{ 'color-red': (isRed == true), underline: isUnderline == true }">STRING</p>

    <button @click="isRed = !isRed">Change Color</button>
    <button @click="isUnderline = !isUnderline">Change Style</button>

    <h1>Vue.js Lifecycle Hooks Demo</h1>
    <button @click="toggleComponent">Toggle Component</button>
    <div v-if="showChild">Child Component</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      imageSrc: 'https://media.geeksforgeeks.org/wp-content/uploads/20230111192709/diff.PNG',
      img_alt: 'Ảnh',
      showChild: true,
      isRed: true,
      isUnderline: true,
    }
  },
  methods: {
    toggleComponent() {
          this.showChild = !this.showChild;
        }
  },
  setup() {
    console.log('setup');
    return {};
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
    var arr = ['tag1', 'tag2', 'tag3', 999]; // ["tag1","tag2","tag3",999]
    console.log(JSON.stringify(arr));
    var obj = {
      age: 29,
      name: 'Nguyễn Văn Mạnh'
    };
    arr = ['tag1', 'tag2', 'tag3', 999, obj]; // ["tag1","tag2","tag3",999]
    console.log(JSON.stringify(arr)); // ["tag1","tag2","tag3",999,{"age":29,"name":"Nguyễn Văn Mạnh"}]
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeUnmount() {
    console.log('beforeUnmount');
  },
  unmounted() {
    console.log('unmounted');
  }
}
</script>

<style scoped>
.color-red {
  color: red;
}

.underline {
  text-decoration: underline;
}
li {
  list-style: none;
}
</style>
