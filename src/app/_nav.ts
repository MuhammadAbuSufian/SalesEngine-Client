export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    permissionName: 'dashboard'
  },
  {
    name: 'Sales',
    url: '/sales',
    icon: 'icon-basket-loaded',
    permissionName: 'sales',
    children: [
      {
        name: 'New Sales',
        url: '/sales/new-sales',
        icon: 'fa fa-barcode',
        permissionName: 'sales',
      }
    ]
  },
  {
    name: 'Products',
    url: '/products',
    icon: 'fa fa-cube',
    permissionName: 'product',
    children: [
      {
        name: 'Add Product',
        url: '/products/add-product',
        icon: 'icon-plus',
        permissionName: 'product',
      },
      {
        name: 'Add Category/Group',
        url: '/products/add-medicine-group',
        icon: 'icon-plus',
        permissionName: 'product',
      },
      {
        name: 'Add Company',
        url: '/products/add-company',
        icon: 'icon-plus',
        permissionName: 'product',
      }
    ]
  },
  {
    name: 'Purchase',
    url: '/purchase',
    icon: 'fa fa-truck',
    permissionName: 'purchase',
    children: [
      {
        name: 'New Purchase',
        url: '/purchase/new-purchase',
        icon: 'fa fa-cubes',
        permissionName: 'purchase'
      }
    ]
  },
  {
    name: 'Inventory',
    url: '/inventory',
    icon: 'fa fa-bank',
    permissionName: 'inventory',
  },
  {
    name: 'Customer',
    url: '/customer',
    icon: 'fa fa-group',
    permissionName: 'dashboard',
  },
  {
    name: 'Account',
    url: '/account',
    icon: 'fa fa-bank',
    permissionName: 'journal',
    children: [
      {
        name: 'Journal',
        url: '/account/journal',
        icon: 'icon-plus',
        permissionName: 'journal'
      },
      {
        name: 'Journal Type',
        url: '/account/journal-type',
        icon: 'icon-plus',
        permissionName: 'journal-type'
      }
    ]
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'fa fa-bar-chart',
    permissionName: 'report',
    children: [
      {
        name: 'Sales Report',
        url: '/reports/sales-report',
        icon: 'icon-arrow-right-circle',
        permissionName: 'sales-report',
      },
      {
        name: 'Parchase Report',
        url: '/reports/purchase-report',
        icon: 'icon-arrow-right-circle',
        permissionName: 'purchase-report',
      },
      {
        name: 'Account Spending',
        url: '/account/account-spending',
        icon: 'icon-arrow-right-circle',
        permissionName: 'account-spending',
      }
    ]
  }
];
