<template>
    <div id="add-category">
        <div class="modal fade" ref="detailCategoryRef" id="detailCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Detail Category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            Title : {{ category.title }} <br>
                            Description : {{ category.description }} <br>
                            Tag : {{ JSON.stringify(category.tag) }} <br>
                            <img :src="config.URL + category.thumbnail" alt="">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import useEventBus from '@/composables/useEventBus';
const { onEvent } = useEventBus();

export default {
    name: 'DetailCategory',
    data() {
        return {
            category: {
                id: null,
                title: '',
                description: "",
                search_number: 0,
                tag: null,
                thumbnail: null,
            },
            isChange:false,
            previewImageSrc: null,
        }
    },
    props: {
        config: Object, 
    },

    mounted() {
        onEvent('eventSelectCategory', (selectedCategory) => {
            this.category = Object.assign({}, selectedCategory); 
        });
    },

    methods: {

  

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

<style scoped>

</style>