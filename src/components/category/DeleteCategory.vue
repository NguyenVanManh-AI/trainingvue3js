<template>
    <div id="add-category">
        <div class="modal fade" ref="deleteCategoryRef" id="deleteCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form @submit.prevent="deleteCategory()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Delete Category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-warning" role="alert">
                            Warning: These category with title is <strong class="text-danger">{{ category.title }}</strong> will be deleted !
                        </div>
                        <img :src="config.URL + category.thumbnail" alt="">          
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>

<script>

import useEventBus from '@/composables/useEventBus';
import UserRequest from '@/restful/UserRequest';
const { emitEvent, onEvent } = useEventBus();

export default {
    name: 'DeleteCategory',
    data() {
        return {
            category: {
                id: null,
                title: '',
                thumbnail: null,
            },
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
        deleteCategory: async function() {
            try {
                const { data, messages } = await UserRequest.delete(`category/delete/${this.category.id}`, null, true);
                // const { data, messages } = await UserRequest.post('category/update/'+this.category.id, formData, true);
                console.log(data);

                this.$refs.deleteCategoryRef.click(); // C1
                // var closePW = window.document.getElementById('updateCategory');
                // closePW.click();
                emitEvent('eventSuccess', messages[0]);
                emitEvent('evenUpdateCategorySuccess', '');
            }
            catch (error) {
                if (error.data) emitEvent('eventError', error.data[0]);
                if (error.messages) emitEvent('eventError', error.messages[0]);
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