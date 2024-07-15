<template>
    <div id="add-category">
        <div class="modal fade" ref="addCategoryRef" id="addCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form @submit.prevent="addCategory()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Category</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <input v-model="category.title" type="text" class="mb-1 form-control" placeholder="Title">
                        <textarea v-model="category.description" class="mb-1 form-control" placeholder="Description" rows="3"></textarea>
                        <input v-model="category.search_number" type="number" min="0" value="0" class="mb-1 form-control" placeholder="Search Number">                    
                        <input ref="fileInput" @change="handleFileUpload" type="file" accept="image/*" class="mb-1 form-control-file" placeholder="Upload Image">               
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
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
const { emitEvent } = useEventBus();

export default {
    name: 'AddCategory',
    data() {
        return {
            category: {
                title: '',
                description: "",
                search_number: 0,
                tag: ["tag1","tag2","tag3",999,{"age":29,"name":"Nguyễn Văn Mạnh"}],
                thumbnail: null,
            }
        }
    },
    props: {

    },

    mounted() {

    },

    methods: {
        handleFileUpload(event) {
            this.category.thumbnail = event.target.files[0];
        },
        addCategory: async function() {
            try {
                const formData = new FormData();
                formData.append('title', this.category.title);
                formData.append('description', this.category.description);
                formData.append('search_number', this.category.search_number);
                this.category.tag = JSON.stringify(this.category.tag);
                formData.append('tag', this.category.tag);
                formData.append('thumbnail', this.category.thumbnail);

                const { data, messages } = await UserRequest.post('category/add', formData, true);
                console.log(data);
                emitEvent('eventSuccess', messages[0]);

                this.$refs.addCategoryRef.click(); // C1
                // var closePW = window.document.getElementById('addCategory'); // C2 
                // closePW.click();
                this.resetData();

                emitEvent('evenAddCategorySuccess', '');
            }
            catch (error) {
                if (error.data) emitEvent('eventError', error.data[0]);
                if (error.messages) emitEvent('eventError', error.messages[0]);
            }
        },
        resetData: function () {
            this.$refs.fileInput.value = '';
            this.category = {
                title: '',
                description: "",
                search_number: 0,
                tag: ["tag1","tag2","tag3",999,{"age":29,"name":"Nguyễn Văn Mạnh"}],
                thumbnail: null,
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