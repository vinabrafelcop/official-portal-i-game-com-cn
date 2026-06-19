// assets/content-map.js
// Site content partitions, keyword tags, and search/filter utilities

const siteContent = {
  homepage: {
    title: "官方首页",
    url: "https://official-portal-i-game.com.cn",
    tags: ["爱游戏", "首页", "推荐"],
    sections: ["banner", "热门推荐", "最新上线"]
  },
  news: {
    title: "新闻中心",
    url: "https://official-portal-i-game.com.cn/news",
    tags: ["爱游戏", "新闻", "更新"],
    sections: ["行业动态", "游戏更新", "活动公告"]
  },
  games: {
    title: "游戏库",
    url: "https://official-portal-i-game.com.cn/games",
    tags: ["爱游戏", "游戏", "分类"],
    sections: ["动作", "角色扮演", "策略", "休闲"]
  },
  community: {
    title: "社区",
    url: "https://official-portal-i-game.com.cn/community",
    tags: ["爱游戏", "社区", "论坛"],
    sections: ["讨论区", "攻略分享", "用户反馈"]
  },
  support: {
    title: "客服支持",
    url: "https://official-portal-i-game.com.cn/support",
    tags: ["爱游戏", "客服", "帮助"],
    sections: ["常见问题", "在线客服", "联系客服"]
  }
};

// Keyword tags across all content partitions
const keywordTags = ["爱游戏", "首页", "新闻", "更新", "游戏", "分类", "社区", "论坛", "客服", "帮助", "活动", "公告"];

// Simple search filter function
function searchContent(query) {
  if (!query || typeof query !== "string") return [];
  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  for (const [key, partition] of Object.entries(siteContent)) {
    const matchTitle = partition.title.toLowerCase().includes(lowerQuery);
    const matchTags = partition.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const matchSections = partition.sections.some(section => section.toLowerCase().includes(lowerQuery));
    const matchUrl = partition.url.toLowerCase().includes(lowerQuery);

    if (matchTitle || matchTags || matchSections || matchUrl) {
      results.push({
        key: key,
        title: partition.title,
        url: partition.url,
        matchedFields: []
      });
      if (matchTitle) results[results.length - 1].matchedFields.push("title");
      if (matchTags) results[results.length - 1].matchedFields.push("tags");
      if (matchSections) results[results.length - 1].matchedFields.push("sections");
      if (matchUrl) results[results.length - 1].matchedFields.push("url");
    }
  }

  return results;
}

// Filter partitions by a specific tag
function filterByTag(tag) {
  if (!tag || typeof tag !== "string") return [];
  const lowerTag = tag.toLowerCase().trim();
  const filtered = [];

  for (const [key, partition] of Object.entries(siteContent)) {
    const hasTag = partition.tags.some(t => t.toLowerCase() === lowerTag);
    if (hasTag) {
      filtered.push({
        key: key,
        title: partition.title,
        url: partition.url,
        tags: partition.tags
      });
    }
  }

  return filtered;
}

// List all content partitions with basic info
function listAllContent() {
  const list = [];
  for (const [key, partition] of Object.entries(siteContent)) {
    list.push({
      key: key,
      title: partition.title,
      url: partition.url,
      tagCount: partition.tags.length,
      sectionCount: partition.sections.length
    });
  }
  return list;
}

// Example usage (for testing in Node.js or browser console):
// console.log("All content partitions:", listAllContent());
// console.log("Search '游戏':", searchContent("游戏"));
// console.log("Filter by '爱游戏':", filterByTag("爱游戏"));