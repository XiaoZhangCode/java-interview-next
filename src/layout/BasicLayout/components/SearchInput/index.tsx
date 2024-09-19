import React from "react";
import {useRouter} from "next/navigation";
import Search from "antd/lib/input/Search";

/**
 * 搜索条
 * @constructor
 */
const SearchInput = () => {
    const router = useRouter();

    return (
        <div
            key="SearchOutlined"
            aria-hidden
            style={{
                display: "flex",
                alignItems: "center",
                marginInlineEnd: 24,
            }}
        >
            <Search
                style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                }}
                placeholder="搜索题目"
                onSearch={(value) => {
                    router.push(`/questions?q=${value}`);
                }}
            />
        </div>
    );
};


export default SearchInput;