<template>
    <div id="detail-category">
        Detail Category
        <div>
            Title : {{ category.title }} <br>
            Description : {{ category.description }} <br>
            Tag : {{ JSON.stringify(category.tag) }} <br>
            <img width="500" :src="config.URL + category.thumbnail" alt="">
        </div>
    </div>
</template>

<script>

import UserRequest from '@/restful/UserRequest';
import useEventBus from '@/composables/useEventBus';
const { emitEvent } = useEventBus();
import config from '@/config';

export default {
    name: 'DetailPageCategory',
    data() {
        return {
            config: config,
            category: {
                id: null,
                title: '',
                description: "",
                search_number: 0,
                tag: null,
                thumbnail: null,
            },
        }
    },
    props: {
    },
    mounted() {
        this.getCategory();
    },

    methods: {
        getCategory: async function () {
            try {
                var categoryId = this.$route.params.id_category; // phải là route , not router (push url mới là router)
                // console.log(this.$route.params.name); // phải là route , not router (push url mới là router)
                const { data, messages } = await UserRequest.get(`category/detail/${categoryId}`, true)
                this.category = data;
                console.log(this.category);
                emitEvent('eventSuccess', messages[0]);
            }
            catch (error) {
                if (error.messages) emitEvent('eventError', error.messages[0]);
            }
        },
    },

    setup() {

    },
    beforeCreate() {

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

<style scoped></style>