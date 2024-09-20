import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        alignItems: "center",
        marginInlineEnd: 24,
        display: pathName === "/search" ? "none" : "flex",
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined />}
        placeholder="搜索题目"
        variant="borderless"
        onChange={handleChange}
        value={value}
        onPressEnter={(e) => {
          let newValue = value;
          setValue("");
          router.push("/search?q=" + newValue);
        }}
      />
    </div>
  );
};

export default SearchInput;
