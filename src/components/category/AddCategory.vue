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
                        <div class="containerPreview">
                            <div class="innerPreview">
                                <div :class="{'minPreview':true, 'havePreview':previewImageSrc != null,'noPreview':previewImageSrc == null}">
                                    <input class="inputFilePreview" type="file" @change="previewImage"
                                        accept="image/*" ref="fileInput" />
                                    <span class="iconCloundPreview" v-if="previewImageSrc == null"><i
                                            class="fa-solid fa-cloud-arrow-up"></i></span>
                                    <div v-if="previewImageSrc" class="boxPreview">
                                        <img class="preview" :src="previewImageSrc" alt="Preview" />
                                        <img src="@/assets/error.png" @click="removeFile" class="closePreview"
                                            alt="Remove">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <input ref="fileInput" @change="handleFileUpload" type="file" accept="image/*" class="mb-1 form-control-file" placeholder="Upload Image">                -->
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
            },
            previewImageSrc: null,
        }
    },
    props: {

    },

    mounted() {

    },

    methods: {
        previewImage(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImageSrc = e.target.result;
                    this.category.thumbnail = file;
                };
                reader.readAsDataURL(file);
            } else this.removeFile();
        },
        removeFile: function () {
            this.previewImageSrc = null;
            this.category.thumbnail = null;
            this.$refs.fileInput.value = '';
        },
        // handleFileUpload(event) {
        //     this.category.thumbnail = event.target.files[0];
        // },
        addCategory: async function() {
            try {
                const formData = new FormData();
                formData.append('title', this.category.title);
                formData.append('description', this.category.description);
                formData.append('search_number', this.category.search_number);
                var tagString = JSON.stringify(this.category.tag);
                formData.append('tag', tagString);
                formData.append('thumbnail', this.category.thumbnail);

                const { data, messages } = await UserRequest.post('category/add', formData, true);
                console.log(data);
                emitEvent('eventSuccess', messages[0]);

                this.$refs.addCategoryRef.click(); // C1
                // var closePW = window.document.getElementById('addCategory'); // C2 
                // closePW.click();
                this.resetData();

                emitEvent('eventRegetCategories', '');
            }
            catch (error) {
                if (error.data) emitEvent('eventError', error.data[0]);
                if (error.messages) emitEvent('eventError', error.messages[0]);
            }
        },
        resetData: function () {
            this.$refs.fileInput.value = '';
            this.previewImageSrc = null,
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

<style scoped>

/* css for preview image */
.containerPreview {
    /* display: flex; */
    align-items: center;
    align-content: center;
    height: 100%;
}
.innerPreview {
    display: flex;
    justify-content: center;
}
.minPreview {
    background-color: #e9ecef;
    position: relative;
    text-align: center;
    /* width: 170px; */
    /* width: 100%; */
    /* height: 170px; */
    max-height: 200px;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
}
.noPreview {
    width: 100%;
}
.havePreview {
    /* width: fit-content; */
    width: 100%;
}
.minPreview .preview {
    /* width: 150px; */
    width: 100%;
    /* height: 150px; */
    max-height: 180px;
    object-fit: cover;
    border-radius: 6px;
    cursor: default;
}

.minPreview:hover {
    transition: all 0.5s ease;
    background: #E8F5E9;
}

.inputFilePreview {
    opacity: 0;
    top: 0px;
    left: 0px;
    position: absolute;
    cursor: pointer;
    /* width: 150px; */
    width: 100%;
    height: 100%;
    /* height: 150px; */
}

.boxPreview {
    position: relative;
}

.iconCloundPreview {
    cursor: pointer;
    font-size: 60px;
    color: var(--user-color);
}

.closePreview {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 16px;
}

/* css for preview image */

</style>