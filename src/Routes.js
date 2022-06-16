import Vue from 'vue';
import Router from 'vue-router';
import goTo from 'vuetify/lib/services/goto'

Vue.use(Router);

export default new Router({
  /*
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0
    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }
    return goTo(scrollTo)
  },*/
  routes: [
    // path 1
    {
      path: '/login',
      name: 'login',
      component: () => import('@/layouts/login/Login'),
    },
    // path 2
    {
      path: '/',
      name: 'layout',
      component: () => import('@/layouts/layout/Layout'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/pages/home/Home'),
        },
        {
          path: '/explore',
          name: 'explore',
          component: () => import('@/pages/explore/Explore'),
          children: [
            /* drawer explore (quitado temporal) */
            // {
            //   path: 'trending',
            //   name: 'trending',
            //   component: () => import('@/pages/Explore/trending/Trending'),
            // },
            {
              path: 'market',
              name: 'market',
              component: () => import('@/pages/explore/market/Market'),
            },
          ]
        },
        {
          path: '/stats',
          name: 'stats',
          component: () => import('@/pages/stats/Stats'),
          children: [
            {
              path: 'ranking',
              name: 'ranking',
              component: () => import('@/pages/stats/ranking/Ranking'),
            },
          ]
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/components/settings/Settings'),
          children: [
            {
              path: 'account',
              name: 'account',
              component: () => import('@/components/settings/account/Account'),
            },
            {
              path: 'notifications',
              name: 'notifications',
              component: () => import('@/components/settings/notifications/Notifications'),
            },
            {
              path: 'wallets',
              name: 'wallets',
              component: () => import('@/components/settings/wallets/Wallets'),
              children: [
                {
                  path: 'purchased',
                  name: 'walletsPurchased',
                  component: () => import('@/components/settings/wallets/purchased/Purchased'),
                },
                {
                  path: 'sold',
                  name: 'walletsSold',
                  component: () => import('@/components/settings/wallets/sold/Sold'),
                },
                {
                  path: 'sale',
                  name: 'walletsSale',
                  component: () => import('@/components/settings/wallets/sale/Sale'),
                },
                {
                  path: 'publish',
                  name: 'walletsPublish',
                  component: () => import('@/components/settings/wallets/publish/Publish'),
                },
              ]
            },
          ]
        }
      ],
    },
    // here path 3 if need
    
    // path 4
    {
      path: '*',
      name: 'error',
      component: () => import('@/layouts/error/Error'),
    }
  ],
});
