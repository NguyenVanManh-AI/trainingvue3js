<template>
    <div>
        <div class="modal fade" ref="deleteManyCategoryRef" id="deleteManyCategory" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form @submit.prevent="deleteMany()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"><i class="fa-solid fa-triangle-exclamation"></i>
                            Warning</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fa-regular fa-circle-xmark"></i></span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-warning" role="alert">
                            <p class="mb-2">Warning: These categorys will be deleted !</p>
                            <div v-for="(category, index) in categories" :key="index">
                                <li  v-if="selectedCategorys.includes(category.id)">Title : {{ category.title }}</li>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" ref="closeButton"
                            id="close">Close</button>
                        <button type="submit" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>
<script>

import UserRequest from '@/restful/UserRequest';
import useEventBus from '@/composables/useEventBus';
const { emitEvent, onEvent } = useEventBus();

export default {
    name: "DeleteManyContent",
    props: {
        selectedCategorys: Array,
    },
    components: {

    },
    data() {
        return {
            categories: null,
        }
    },
    mounted() {
        onEvent('selectManyContent', (categories) => {
            this.categories = categories;
        });
    },
    methods: {
        deleteMany: async function () {
            const selectedCategorysArray = Object.values(this.selectedCategorys);
            var data = {
                list_id: selectedCategorysArray
            }
            try {
                const { messages } = await UserRequest.post('category/deletes', data, true);
                emitEvent('eventSuccess', messages[0]);
                emitEvent('evenUpdateCategorySuccess', '');
                this.$refs.deleteManyCategoryRef.click();
            }
            catch (error) {
                if (error.data) emitEvent('eventError', error.data[0]);
                if (error.messages) emitEvent('eventError', error.messages[0]);
            }
        },
    }
}
</script>

<style scoped>

</style>
