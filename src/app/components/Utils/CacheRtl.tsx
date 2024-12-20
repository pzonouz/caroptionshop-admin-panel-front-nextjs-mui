"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const CacheRtl = ({ children }: { children: React.ReactNode }) => {
  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
};

export { CacheRtl };
