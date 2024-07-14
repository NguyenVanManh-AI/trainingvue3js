<template>
  <div class="hello" style="display: flex;">
    <div style="height: 100vh; width: 50%;border: 10px solid red;">
      Left bar

      <!-- C2 -->
      <li><router-link :to="{ name: 'ComponentALink' }">Content A</router-link></li>
      <li><router-link :to="{ name: 'ComponentB' }">Content B</router-link></li>
      <li><router-link :to="{ name: 'ComponentC' }">Content C</router-link></li>

      <!-- C1 -->
      <!-- <li><router-link to="/content/content-a">Content A</router-link></li> -->
      <!-- <li><router-link to="/content/content-b">Content B</router-link></li> -->
      <!-- <li><router-link to="/content/content-c">Content C</router-link></li> -->

      <!-- C3 -->
      <li><a @click="gotopage('a')">Content A</a></li> 
      <li><a @click="gotopage('b')">Content B</a> </li>
      <li><a @click="gotopage('c')">Content C</a> </li>
    </div>
    <div style="height: 100vh; width: 50%;border: 10px solid green;">
      Load content 
      <router-view></router-view>
    </div>
</div>
</template>

<script>

export default {
  name: 'HelloWorld',
  components : {

  },
  data() {
    return {

    }
  },
  methods: {
    gotopage: function(name) {
      switch(name) {
        case 'a':
          this.$router.push({ name: 'ComponentALink' }); 
          break;
        case 'b':
          this.$router.push({ name: 'ComponentB' }); 
          break;
        case 'c':
          this.$router.push({ name: 'ComponentC' }); 
          break;
      }
          
    }
  },
  setup() {

  },
  beforeCreate() {

  },
  created() {

  },
  beforeMount() {

  },
  mounted() {


    // console.log('mounted');
    // var arr = ['tag1', 'tag2', 'tag3', 999]; // ["tag1","tag2","tag3",999]
    // console.log(JSON.stringify(arr));
    // var obj = {
    //   age: 29,
    //   name: 'Nguyễn Văn Mạnh'
    // };
    // arr = ['tag1', 'tag2', 'tag3', 999, obj]; // ["tag1","tag2","tag3",999]
    // console.log(JSON.stringify(arr)); // ["tag1","tag2","tag3",999,{"age":29,"name":"Nguyễn Văn Mạnh"}]
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
