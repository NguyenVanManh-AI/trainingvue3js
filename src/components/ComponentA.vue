<template>
    <div id="comp-a">
      Component A 
      <strong>{{ numberChild }}</strong>
      
      <br>
      <strong>{{ arrChild[4].age }}</strong>
      <br>
      <strong>{{ arrChild[4].name }}</strong>
      <br>


      <strong>{{ personChild.weight }}</strong>
      <strong>{{ personChild.age }}</strong>
      <strong>{{ personChild.name }}</strong>
  </div>
  </template>
  
  <script>
  export default {
    name: 'ComponentA',
    data() {
      return {

      }
    },
    props : {
      numberChild: Number,
      arrChild: Array,
      personChild: Object,
      printNameChild: Function,
    },

    mounted() {
      this.printNameChild();
    },

    methods: {
      // printNameChild: function() {

      // }
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
  
  <style >

  </style>
  