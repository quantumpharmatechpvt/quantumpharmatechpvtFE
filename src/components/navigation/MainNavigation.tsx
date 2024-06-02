"use client";
import { usePathname } from "next/navigation";
import { Box, Tabs, Tab, Hidden } from "@mui/material";
import Link from "next/link";
import React, { useMemo } from "react";

const validTabValues = [
  "/home",
  "/Top Products",
  "/Personal Cares",
  "/Medicines",
  "/Lab Tests",
  "/Health Care",
  "/Offers",
  "/Value Store",
  "/Vitamins",
  "/Women Care",
  "/Hair & Skin Care"
];

const MainNavigationTabs = () => {
  const currentPath = usePathname();

  const tabValue = useMemo(() => {
    for (let validTabValue of validTabValues) {
      if (currentPath.startsWith(validTabValue)) {
        return validTabValue;
      }
    }
    return false;
  }, [currentPath]);

  return (
    <Hidden mdDown>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} centered={true}>
          <Tab label="Home" value="/home" href="/home" LinkComponent={Link} />
          <Tab
            label="Top Products"
            value="/TopProducts"
            href="/TopProducts"
            LinkComponent={Link}
          />
          <Tab
            label="Personal Cares"
            value="/Personal-Cares"
            href="/Personal-Cares"
            LinkComponent={Link}
          />
          <Tab
            label="Medicines"
            value="/Medicines"
            href="/Medicines"
            LinkComponent={Link}
          />
          <Tab
            label="Lab Tests"
            value="/Lab-Tests"
            href="/Lab-Tests"
            LinkComponent={Link}
          />
          <Tab
            label="Health Care"
            value="/Health-Care"
            href="/Health-Care"
            LinkComponent={Link}
          />
          <Tab
            label="Offers"
            value="/Offers"
            href="/Offers"
            LinkComponent={Link}
          />{" "}
          <Tab
            label="Value Store"
            value="/Value Store"
            href="/Value Store"
            LinkComponent={Link}
          />{" "}
          <Tab
            label="Vitamins"
            value="/Vitamins"
            href="/Vitamins"
            LinkComponent={Link}
          />{" "}
          <Tab
            label="Hair & Skin Care"
            value="/Hair"
            href="/Hair"
            LinkComponent={Link}
          />{" "}
          <Tab
            label="Women Care"
            value="/women"
            href="/women"
            LinkComponent={Link}
          />
        </Tabs>
      </Box>
    </Hidden>
  );
};

export default MainNavigationTabs;
