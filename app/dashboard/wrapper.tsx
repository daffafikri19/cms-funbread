"use client";

import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import { DashboardNavbar } from "./components/navbar";
import { SidebarMenu } from "./components/sidebar/sidebar-menu";
import { BrandLogo } from "./components/navbar/brand-logo";
import { useSidebar } from "@/store/use-sidebar";
import { useMediaQuery } from "usehooks-ts";
import { BreadCrumb } from "./components/breadcrumb";

type props = {
  children: React.ReactNode;
};

const { Header, Sider, Content } = Layout;

const DashboardLayoutWrapper = ({ children }: props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const matches = useMediaQuery("(max-width: 800px)");

  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse(!collapsed);
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <Layout className="w-full min-h-[100dvh] h-full relative">
      <div
        className="h-[100dvh] overflow-scroll sticky top-0 left-0 shadow-md"
        style={{
          background: colorBgContainer,
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={50}
          style={{
            background: colorBgContainer,
          }}
          className="h-full absolute top-0 left-0 overflow-y-scroll"
        >
          <BrandLogo isCollapsed={collapsed} />
          <SidebarMenu />
        </Sider>
      </div>
      <Layout className="relative">
        <Header
          style={{ background: colorBgContainer }}
          className="flex items-center !px-2 sticky top-0 !h-12 shadow-md"
        >
          <Button
            type="text"
            size="large"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined color="white" />
              ) : (
                <MenuFoldOutlined color="white" />
              )
            }
            onClick={() => onCollapse(!collapsed)}
          />

          <DashboardNavbar />
        </Header>

        <Content
          className="p-4 h-full overflow-scroll"
          style={{
            borderRadius: borderRadiusLG,
          }}
        >
          <BreadCrumb />
          <div className="p-2">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayoutWrapper;
