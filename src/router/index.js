import Vue from 'vue'
import Router from 'vue-router' 
import appRule from '@/components/appRule' 
import rule from '@/components/rule' 
import slice from '@/components/slice'
import strategy from '@/components/strategy'
import download from '@/components/download'
import download2 from '@/components/download2'
Vue.use(Router) 
export default new Router({
	mode: 'hash', 
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve=>require(['@/components/home'],resolve),
			meta: {
        keepAlive: true
      } 
    },
		 {
		  path: '/search',
		  name: 'search',
      component: resolve=>require(['@/components/search'],resolve),
		},
		 {
		  path: '/download',
		  name: 'download',
		  component: download,
		},
		 {
		  path: '/download2',
		  name: 'download2',
		  component: download2,
		},
		 {
		  path: '/myDollar',
		  name: 'myDollar',
      component: resolve=>require(['@/components/myDollar'],resolve),
		},
		 {
		  path: '/list',
		  name: 'list',
      component: resolve=>require(['@/components/list'],resolve),
		},
		 {
		  path: '/bookInfo',
		  name: 'bookInfo',
      component: resolve=>require(['@/components/bookInfo'],resolve),
		},
		{
		  path: '/strategy',
		  name: 'strategy',
      component: strategy,
		},
		{
		  path: '/bookStructure',
		  name: 'bookStructure',
      component: resolve=>require(['@/components/bookStructure'],resolve),
		},
		{
		  path: '/bookContent',
		  name: 'bookContent',
      component: resolve=>require(['@/components/bookContent'],resolve),
		},
		{
		  path: '/task',
		  name: 'task',
      component: resolve=>require(['@/components/task'],resolve),
			meta: {
        keepAlive: true
      } 
		},
		{
		  path: '/rank',
		  name: 'rank',
      component: resolve=>require(['@/components/rank'],resolve),
			meta: {
		    keepAlive: true
		  } 
		},
			{
		  path: '/slice',
		  name: 'slice',
      component: slice,
		},
		{
		  path: '/myBook',
		  name: 'myBook',
      component: resolve=>require(['@/components/myBook'],resolve),
			meta: {
		    keepAlive: true
		  } 
		},
		{
		  path: '/user',
		  name: 'user',
      component: resolve=>require(['@/components/user'],resolve),
			meta: {
		    keepAlive: true
		  } 
		},
			{
		  path: '/rule',
		  name: 'rule',
      component: rule,
		},
			{
		  path: '/apprentice',
		  name: 'apprentice',
      component: resolve=>require(['@/components/apprentice'],resolve),
		}, 
			{
		  path: '/appRule',
		  name: 'appRule',
      component: appRule,
		}, 
		 
  ]
}) 