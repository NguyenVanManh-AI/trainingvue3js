import { createRouter, createWebHistory } from 'vue-router'

import HelloWorld from '@/components/HelloWorld';
import ComponentAImport from '@/components/ComponentA';
import ComponentB from '@/components/ComponentB';
import ComponentC from '@/components/ComponentC';
import CommonNotFound from '@/components/common/CommonNotFound'

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
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeResolve((to, from, next) => {
    next()
})

export default router
