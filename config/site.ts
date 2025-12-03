export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ExpenseTracker",
  description: "Quản lý chi tiêu cá nhân thông minh và hiệu quả.",
  navItems: [
    {
      label: "Trang chủ",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Giao dịch",
      href: "/dashboard/transactions",
    },
    {
      label: "Ngân sách",
      href: "/dashboard/budgets",
    },
  ],
  navMenuItems: [
    {
      label: "Trang chủ",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Giao dịch",
      href: "/dashboard/transactions",
    },
    {
      label: "Danh mục",
      href: "/dashboard/categories",
    },
    {
      label: "Ví",
      href: "/dashboard/wallets",
    },
    {
      label: "Ngân sách",
      href: "/dashboard/budgets",
    },
    {
      label: "Cài đặt",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
