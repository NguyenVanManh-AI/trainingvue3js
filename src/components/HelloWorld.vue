<template>
  <div class="hello">
    <CompA99999 :numberChild="number" :arrChild="arr" :personChild="person" :printNameChild="printName"></CompA99999>
</div>
</template>

<script>
import CompA from '@/components/ComponentA' 
// import CompA from './ComponentA'

export default {
  name: 'HelloWorld',
  components : {
    CompA99999:CompA,
  },
  data() {
    return {
      number : 9,
      arr: [1,2,3, 'string', {age:19, name:'nvm'}],
      person : {
        weight:59,
        height: 179,
        age:19, 
        name:'nvm'
      }
    }
  },
  methods: {
    printName: function() {
      console.log("Nguyen Van Manh");
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
