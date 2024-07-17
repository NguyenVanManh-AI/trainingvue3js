import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from '@/components/HelloWorld';
import ComponentAImport from '@/components/ComponentA';
import ComponentB from '@/components/ComponentB';
import ComponentC from '@/components/ComponentC';
import ManageCategory from '@/components/category/ManageCategory';
import CommonNotFound from '@/components/common/CommonNotFound'
import DetailPageCategory from '@/components/category/DetailPageCategory'

const routes = [
    {
        path: '/content',
        component: HelloWorld,
        name: 'HelloWorld',
        children: [
            { path: 'content-a', name: 'ComponentALink', component: ComponentAImport },
            { path: 'content-b', name: 'ComponentB', component: ComponentB },
            { path: 'content-c', name: 'ComponentC', component: ComponentC },
        ]
    }, 
    { path: '/category', component: ManageCategory, name: 'ManageCategory'},
    // {path:'/category/:id_category/:name', component: DetailPageCategory, name: 'DetailPageCategory'},
    {path:'/category/:id_category', component: DetailPageCategory, name: 'DetailPageCategory'},
    { path: '/:CommonNotFound(.*)*', component: CommonNotFound, name: 'CommonNotFound' }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeResolve((to, from, next) => {
    next()
})

export default router
