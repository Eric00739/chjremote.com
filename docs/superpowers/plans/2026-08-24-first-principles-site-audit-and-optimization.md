# CHJ Remote 网站第一性原理审核与优化执行计划

> **状态：历史审核与执行记录。** 2026-08-24 的 P0/P1 修复已进入草稿 PR #1，但尚未合并或部署。不要从头顺序重跑本计划；当前事实以代码、测试、README 和 `docs/content/claim-register.md` 为准。尚未完成的独立工作是业务证据、博客静态 URL 和开发工具链升级。

**审核日期：** 2026-08-24
**审核对象：** `https://www.chjremote.com/` 与仓库 `Eric00739/chjremote.com`
**当前基线：** `main` @ `e19c285b44b6`，审核开始时工作区干净
**本计划不包含：** 直接部署、发送表单、添加分析埋点、编造产品参数或客户证明

## 当前执行记录（2026-08-24）

- Task 0–4：已在 `codex/adversarial-site-hardening` 完成事实清理、联系路径、语义导航、canonical、robots 和 sitemap 修复；草稿 PR #1 尚未合并或部署。
- Task 5：最终决定是不发布现有视频和 PDF。视频带有第三方水印且权利与拍摄地点未核实，PDF 不是可读文件；两者已从 `public/` 移除，本地归档位于被 Git 忽略的 `docs/media-source/`。
- QA：桌面与 390 px 移动端真实浏览器回归通过；首页不再请求视频或 Google Fonts，联系页没有模拟表单。
- Task 6：等待真实产品型号、公开参数、证书、工厂照片和案例授权；没有这些资料不继续编写数字型证明。
- Task 7：独立 URL/静态博客架构尚未开始，需在单独上下文中处理。
- Task 8：开发工具链 major 升级尚未开始；生产依赖审计为 0，开发依赖警告仍需单独处理。
- Task 9：已增加 9 项关键回归测试，但静态文章 URL 与完整发布检查仍未完成。

---

## 1. 结论先行

当前网站已经有一套相对统一的工业视觉，首屏也能让人知道这是 RF 遥控器相关制造商。但它还不是一个可靠的获客网站。

最严重的问题不是颜色或圆角，而是三件事：

1. 联系表单不会发送任何内容，只弹出模拟提示。主转化路径实际上是断的。
2. 页面大量文案在解释“网站如何改版”，而不是回答采购商的问题。这些内容已经被搜索引擎收录。
3. 产品、工厂、认证、案例和技术能力缺少可核验的证据。匿名评价与笼统数字会让谨慎的采购商更加怀疑。

一句话判断：**视觉像一个 B2B 官网，信息和转化能力还停留在演示站。**

不要先做新的视觉重构。先修转化、可信度、SEO、资源加载和技术错误。

---

## 2. 第一性原理

### 2.1 网站真正要完成的工作

这个站点的目标不是“显得高级”，也不是让访客多滚几屏。它应当增加合格的 OEM/ODM 询盘，并降低销售解释成本。

访客在决定联系前，需要依次得到五个答案：

1. **相关性：** 你们是否做我需要的产品、频率、协议和应用？
2. **能力：** 你们能否完成设计、打样、测试、认证配合和量产？
3. **可信度：** 这些能力有什么照片、参数、证书、设备、客户结果或流程记录可以证明？
4. **风险：** MOQ、样品周期、量产周期、质量控制、区域合规和售后如何处理？
5. **行动：** 我能否在一分钟内用表单、邮件或 WhatsApp 发出项目需求，并知道接下来会发生什么？

当前站点第 1 项大致合格，第 2 项偏抽象，第 3、4 项明显不足，第 5 项失败。

### 2.2 页面判断标准

每一屏只承担一个任务：解释、证明、展开或转化。

- 首页负责确认相关性、展示可信证据、引导询盘。
- Products 负责让采购和工程人员快速筛选产品方向。
- About 负责证明“这是一个真实、可合作的制造团队”。
- Blog 负责获取长尾搜索流量并证明技术判断力。
- Contact 负责收集项目简报，不负责展示模拟交互。

---

## 3. 已验证的当前基线

### 3.1 自动化结果

| 项目 | 移动端 | 桌面端 |
|---|---:|---:|
| Lighthouse Performance | 78 | 79 |
| Lighthouse Accessibility | 87 | 95 |
| Lighthouse Best Practices | 96 | 96 |
| Lighthouse SEO | 92 | 92 |
| FCP | 2.6 s | 1.4 s |
| LCP | 4.7 s | 2.7 s |
| Lighthouse 传输量 | 4,770 KiB | 3,830 KiB |

其他验证结果：

- `npm test`：4 个测试通过。
- `npm run build`：通过，主 JS 约 205.81 kB，gzip 后约 63.50 kB。
- 首页视频：11,222,771 bytes，`preload="auto"`。
- 产品目录 PDF：27,276,789 bytes。
- 视频 poster URL 返回 404。
- `robots.txt` 是 8,437 bytes 的 `%ONEDLP_HEADER%` 二进制数据；Lighthouse 报 36 个语法错误。
- `npm audit`：11 个问题，包括 1 critical、6 high。主要位于 Vite/Vitest/PostCSS 等开发工具链，不代表静态线上页面已被利用，但开发服务器不应暴露在公网。
- 搜索检查只稳定识别到首页；首页摘要已经包含 “The site now leads…” 等改版说明。

### 3.2 代码证据

- `src/App.jsx` 共 1,089 行，页面、文章、路由状态、表单和页脚集中在一个文件。
- `navigate()` 只修改 React state，不更新地址栏，也没有处理 `popstate`。站内点击后刷新会回到 URL 对应的旧页面。
- 导航和博客卡片大量使用 `<button>`/`onClick`，不是可抓取的真实链接。
- 博客详情只有内存状态，没有独立 URL、canonical、Open Graph 或 sitemap 项。
- Contact 表单的 `onSubmit` 只执行 `alert("Inquiry simulated…")`。
- 表单输入框只有 placeholder，没有显式 label 和稳定的 `name`。
- 移动菜单按钮没有可访问名称；Lighthouse 已报 `button-name` 失败。
- 首页多个深色区域使用 `text-white/45`，对比度低于 WCAG AA。
- `public/sitemap.xml` 使用非 `www`、无尾斜杠 URL，而线上会重定向到 `www` 和尾斜杠版本。
- 首页没有 canonical、Open Graph、Twitter Card 或结构化数据。
- `src/App.jsx` 第 102 行写着 15 dBm 差异超过 30,000 倍；正确的功率比约为 `10^(15/10) = 31.6` 倍。该文后面又写成 30 倍，前后矛盾。

---

## 4. 对抗性分析

### 4.1 谨慎的采购经理

他会问：

- 20+ 年、50+ 国家、7 天样品是否有证据？
- 匿名客户评价是否真实？
- 有没有 MOQ、量产周期、质量控制、退换/售后和区域认证信息？
- 为什么 About 页面只有四个抽象能力卡，没有工厂面积、设备、团队、产线、证书或审核资料？

当前可能结果：页面看起来不错，但无法完成供应商预审，转去资料更具体的竞品或 Alibaba/Made-in-China 页面。

### 4.2 RF 工程师

他会检查技术表述是否严谨：

- 频率、调制、编码/滚码协议、发射功率、接收灵敏度是否写了测试条件？
- 接收范围是否注明天线、数据率、BER/PER、环境和法规限制？
- “ASK 只能到 -85 dBm”“Sensitivity does not have a ceiling” 这类绝对表述是否经得起推敲？
- 15 dBm 的计算为什么错了三个数量级？

当前可能结果：一处明显算术错误足以让整篇技术内容失去可信度。

### 4.3 搜索引擎与非 JavaScript 抓取器

它看到的是：

- 无效的 robots 文件。
- 首页以外的内部导航不是 `<a href>`。
- 博客文章没有独立地址和独立元数据。
- sitemap URL 与最终 canonical 主机/路径不一致。
- 产品页和 About 页内容很薄，缺少可搜索的具体实体、型号、参数和证据。

当前可能结果：首页被收录，其他页面发现和排名能力弱，技术文章无法形成独立搜索入口。

### 4.4 移动网络用户

移动端 390×844 的首屏看不到工厂视频，只看到标题、较长说明、两个 CTA 和第一张数字卡。与此同时，视频仍设置为自动预加载。

当前可能结果：用户先承担资源成本，后看到证据；LCP 达 4.7 秒，弱网下更差。

### 4.5 潜在客户提交询盘

他填写公司、邮箱和项目需求，点击后只看到“模拟提交”。

当前可能结果：直接丢失线索，并让用户怀疑网站和公司是否真实运营。这是 P0，不允许延期到视觉优化之后。

### 4.6 维护者与较低能力模型

1,089 行的 `App.jsx` 同时包含长文章 HTML 和交互逻辑。任何小改都可能误伤文章、页面或导航。

当前可能结果：模型在修改文案时截断模板字符串，或在改导航时破坏博客状态。执行计划必须先小改、加测试，再拆文件；不能一次性重写。

---

## 5. 与当前市场页面的差距

当前搜索结果中的竞品页面未必视觉更好，但往往更具体：

- [Celadon / Remote Control Manufacturer](https://remotecontrolmanufacturer.com/) 直接列出 RF/IR、定制外壳、低批量、认证与具体联系方式。
- [Keguanglong](https://remotecontrolcn.com/) 在首屏给出样品周期、WhatsApp、生产周期和产品应用范围。
- [CHJ 首页](https://www.chjremote.com/) 的视觉更整齐，但核心证明仍是抽象描述、匿名评价和未经展开的数字。

优化方向不是照抄竞品的密集页面，而是保留现有品牌感，同时把具体产品、验证条件、真实证据和联系动作补齐。

---

## 6. 目标体验

### 6.1 视觉主张

**精密 RF 制造：深海军蓝、克制的琥珀色、真实产线与产品微距、像工程记录一样清楚。**

不要新增渐变背景、卡片墙或装饰图标。优先使用真实产品、测试设备、产线、包装和证书照片。

### 6.2 首页内容顺序

1. Hero：产品范围 + 服务对象 + 一个主 CTA + 一张/一段真实工厂证据。
2. 快速资格判断：频率、协议方向、OEM/ODM、区域认证支持、样品周期；只放已核实内容。
3. 产品家族：真实产品图、应用、关键规格、进入详情页链接。
4. 制造证据：RF 测试设备、产线、质量流程、证书。
5. 项目流程：Brief → feasibility → sample → validation → production。
6. 可验证案例：问题、方案、结果、授权范围；无授权则不写客户名，但不能伪造引语。
7. 最终 CTA：表单、Email、WhatsApp 三条可用路径。

### 6.3 首屏约束

- 桌面端 header + hero 主要内容应在常见 1440×900/1000 首屏内完成，不让半张统计卡卡在视口底部。
- 移动端前 844 px 内必须出现真实产品或工厂视觉，不要把三张统计卡放在视频之前。
- 主 CTA 只保留一个。Catalog 可作为次级文本链接或轮廓按钮。
- Hero 支持文案控制在一句，避免 “stronger factory story” 这类站在品牌方视角的表达。

---

## 7. 执行优先级

### P0：先止损

1. 修复或替换模拟联系表单。
2. 删除所有改版说明式文案。
3. 修复技术文章中的明确错误；未审内容降级为待审核状态。
4. 修复 `robots.txt`、canonical 主机和 sitemap。
5. 添加可点击 Email、电话和 WhatsApp。

### P1：提高可信度和可发现性

1. 把导航改成真实链接，地址栏、刷新、后退行为正确。
2. 为产品和博客提供独立、可抓取 URL。
3. 补真实产品图、规格、工厂与认证证据。
4. 优化视频、poster、PDF 和移动端首屏。
5. 修复可访问性和依赖工具链。

### P2：优化与扩展

1. 评估迁移到 Astro 等静态站点生成方案。
2. 增加更多经工程审核的技术文章和产品详情。
3. 在用户明确授权后，再考虑分析埋点、CRM 或自动化线索分发。

不要在 P0 完成前做 P2。

---

## 8. 低能力模型执行规则

每次执行一个 Task，遵守以下规则：

1. 开始前读取本计划、`AGENTS.md`、该 Task 列出的文件和现有测试。
2. 先写或修改测试，再改实现。
3. 不编造型号、认证、客户、国家数量、交付周期、MOQ、工厂面积或性能参数。
4. 遇到 `[OWNER INPUT]` 必须停止，向用户索取事实或配置。不能用占位数字上线。
5. 不使用 `npm audit fix --force`，不顺手升级无关依赖。
6. 不添加分析、埋点、外部脚本或新网络请求，除非对应 Task 明确要求且用户已授权。
7. 每个 Task 完成后运行该 Task 的验证命令，报告改动文件和结果，然后停止。
8. 不提交、不推送、不部署，除非用户在执行任务中明确要求。

建议给执行模型的提示词：

```text
读取 docs/superpowers/plans/2026-08-24-first-principles-site-audit-and-optimization.md。
只执行 Task N，不执行后续 Task。先检查当前 git 状态和相关文件，按计划补测试、实现、运行验收命令。
不得编造业务事实；遇到 [OWNER INPUT] 立即停止并说明缺少什么。
完成后只报告：结果、改动文件、测试、未解决问题。
```

---

## 9. 分任务实施计划

### Task 0：建立业务事实清单

**目标：** 分清哪些内容有证据，哪些必须删除、降级或等待资料。

**文件：**

- Create: `docs/content/claim-register.md`
- Read: `src/App.jsx`
- Read: `about/index.html`
- Read: `products/index.html`
- Read: `blog/index.html`
- Read: `contact/index.html`

**步骤：**

- [ ] 收集所有数字、认证、客户评价、案例、交付周期、地区和性能声明。
- [ ] 为每项记录：原文、页面、证据文件/负责人、状态、允许的公开表达。
- [ ] 状态只能是 `verified`、`needs-owner-proof`、`remove`。
- [ ] 把以下内容列为首批核验项：20+ years、50+ countries、7-day sample、ISO9001、两条客户评价、意大利/美国案例。
- [ ] `[OWNER INPUT]` 索取证书扫描件、真实产品资料、授权图片、案例授权范围和样品/量产规则。

**验收：**

- 每个公开强声明都有证据或明确删除决定。
- 文件中不得出现新编造的营销数据。

**停止条件：**

- 若用户没有证据，不继续“润色”该声明；Task 1 直接删除或改成不含数字的事实描述。

---

### Task 1：清除演示站文案和明确技术错误

**目标：** 先恢复基本专业可信度，不改整体布局。

**文件：**

- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`
- Read: `docs/content/claim-register.md`

**先写测试：**

- [ ] 断言页面不再包含：`The site now`、`The original page`、`This version`、`revised About page`、`layout now`、`blog is reframed`、`contact page now`。
- [ ] 断言 RF 灵敏度文章不再包含 `30,000 times`。

**实现：**

- [ ] 把首页、About、Products、Blog、Contact 的改版说明替换成采购者语言。
- [ ] 首页 hero 支持句改为产品、客户类型和能力，不谈“factory story”。
- [ ] 将 15 dBm 功率比改为约 31.6 倍，并检查同段前后单位。
- [ ] 删除或改写未经证实的匿名评价、案例和数字，严格按 claim register 执行。
- [ ] 将 “Sensitivity does not have a ceiling” 等绝对表述改成有物理边界和测试条件的说法。
- [ ] 对涉及法规、认证、允许发射功率的段落标记工程/合规复核；未复核前不要写确定结论。

**验证：**

```bash
npm test
npm run build
rg -n "The site now|The original page|This version|revised About|layout now|blog is reframed|contact page now|30,000 times" src/App.jsx
```

**预期：** 测试和构建通过；`rg` 无输出。

---

### Task 2：修复联系与询盘路径

**目标：** 任何 CTA 都进入真实、可完成的联系路径。

**文件：**

- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`
- Optional Create: `.env.example`

**决策：**

- 没有表单服务时：删除模拟提交，把主 CTA 改成 Email/WhatsApp，保留结构化项目简报提示。
- 有表单服务时：`[OWNER INPUT]` 提供 endpoint 和成功/失败规则。敏感配置只能通过环境变量或部署平台 secret 提供。

**先写测试：**

- [ ] 页面不存在 `Inquiry simulated`。
- [ ] Email 使用 `mailto:sales@chjremote.com`。
- [ ] 电话使用 `tel:+8618028993261`。
- [ ] WhatsApp 使用 `https://wa.me/8618028993261`。
- [ ] 所有表单控件有 label、name 和正确 type。
- [ ] 有 endpoint 时，测试 loading、success、server error 和网络错误状态。

**实现：**

- [ ] 把 Contact 卡片和 footer 的 Email、Phone、WhatsApp 都改成真实 `<a>`。
- [ ] 给外部 WhatsApp 链接添加安全的 target/rel，或在当前窗口打开。
- [ ] 为表单补 `label`、`name`、`autocomplete`、错误提示和提交状态。
- [ ] 成功信息说明预计回复时间；只有经过业务确认后才能写具体小时数。
- [ ] 添加简短隐私说明和可访问的状态区域 `aria-live`。
- [ ] 后端未就绪时不能保留看似可提交的表单。

**验证：**

```bash
npm test
npm run build
rg -n "Inquiry simulated|alert\(" src/App.jsx
```

**人工验收：**

- 从首页、文章、Contact 和 footer 分别进入联系路径。
- 在手机上点击电话与 WhatsApp。
- 若启用表单，发送一条明确标记为测试的询盘并确认收件。该动作需要用户在执行时授权。

---

### Task 3：修复语义导航和浏览器行为

**目标：** 页面链接可抓取，地址栏、刷新、后退和新标签页行为正常。

**文件：**

- Modify: `src/App.jsx`
- Modify: `src/App.test.jsx`
- Modify: `public/404.html`
- Possibly Modify: `vite.config.js`

**推荐的最小改法：**

- Home/About/Products/Blog/Contact 使用真实 `<a href>`，让已有多入口 HTML 正常工作。
- 不在这个 Task 引入新的路由库。
- CTA 如果是页面跳转，也使用链接；只有菜单开关、FAQ 和表单提交使用 button。

**先写测试：**

- [ ] 导航项 role 为 `link`，href 分别是 `/`、`/about/`、`/products/`、`/blog/`、`/contact/`。
- [ ] 当前页包含 `aria-current="page"`。
- [ ] 移动菜单按钮有 `aria-label`、`aria-expanded`、`aria-controls`。

**实现：**

- [ ] 用 `<a>` 替换 `NavButton` 页面跳转。
- [ ] 统一 URL 为 `https://www.chjremote.com/.../`。
- [ ] 删除仅用于页面跳转的 `navigate()` 分支；保留必要的 UI state。
- [ ] 检查 404 fallback 不会丢失有效路径。
- [ ] 不要在此 Task 处理博客详情路由；Task 7 单独处理。

**验证：**

```bash
npm test
npm run build
for path in / /about/ /products/ /blog/ /contact/; do curl -sS -o /dev/null -w "%{http_code} %{url_effective}\n" "https://www.chjremote.com${path}"; done
```

部署前本地人工检查：从首页点击每个链接，确认地址栏变化，刷新后仍是同一页，浏览器后退可用。

---

### Task 4：修复 robots、canonical 与分享元数据

**目标：** 消除当前 SEO 技术错误，统一唯一 URL。

**文件：**

- Replace: `public/robots.txt`
- Modify: `public/sitemap.xml`
- Modify: `index.html`
- Modify: `about/index.html`
- Modify: `products/index.html`
- Modify: `blog/index.html`
- Modify: `contact/index.html`
- Modify: `src/App.test.jsx` or Create: `src/seo.test.js`

**实现：**

- [ ] 将 `robots.txt` 替换成纯 UTF-8 文本：

```text
User-agent: *
Allow: /
Sitemap: https://www.chjremote.com/sitemap.xml
```

- [ ] sitemap 全部使用 `https://www.chjremote.com/` 和统一尾斜杠。
- [ ] 首页添加 canonical、Open Graph 和 Twitter Card。
- [ ] 每个静态页面的 canonical、`og:url` 与最终 URL 完全一致。
- [ ] 只添加经过 claim register 核实的 Organization 结构化数据。
- [ ] 从业务 footer 删除 Robots、Sitemap 和 GitHub 链接；这些不是采购者任务。sitemap 不需要在 footer 暴露。

**验证：**

```bash
npm test
npm run build
file public/robots.txt
sed -n '1,20p' public/robots.txt
rg -n "https://chjremote.com" index.html about products blog contact public/sitemap.xml
```

**预期：**

- `robots.txt` 被识别为文本，不含 `%ONEDLP_HEADER%`。
- 最后一条 `rg` 无输出。
- Lighthouse SEO 不再报告 robots 错误。

---

### Task 5：优化首屏媒体、PDF 和可访问性

**目标：** 移动端先看到证据，且不为未显示的视频承担大下载。

**文件：**

- Modify: `src/App.jsx`
- Modify: `src/index.css`
- Create: `public/videos/factory-hero-poster.jpg`
- Replace: `public/videos/factory-hero.mp4`
- Remove after verification: `public/videos/factory-hero-backup.mp4`
- Replace or optimize: `public/catalog.pdf`
- Modify: `src/App.test.jsx`

**实现顺序：**

- [ ] 先从原视频生成真实 poster，目标小于 150 kB；不要使用不存在的路径。
- [ ] 将视频缩到适合网页的分辨率和码率，目标小于 3 MB，并启用 fast start。
- [ ] 桌面端使用优化视频；移动端先显示 poster，用户点击后再加载视频。
- [ ] 不使用 `preload="auto"`。移动端不得在未播放时请求完整视频。
- [ ] 视频失败时保留 poster 和文字，不要把整个证据区隐藏。
- [ ] 将 27 MB PDF 压缩到可接受范围，目标小于 8 MB；如果图片质量无法满足产品阅读，拆成网页产品页 + 可选高质量 PDF。
- [ ] 修复移动菜单按钮名称、`aria-expanded` 和焦点管理。
- [ ] 把深色背景上的 `text-white/45` 提升到通过 WCAG AA 的颜色。
- [ ] 为动画添加 `prefers-reduced-motion` 降级。
- [ ] 调整 hero：移动端首屏出现 poster；桌面端不再露出半张统计卡。

**媒体命令边界：**

- 执行前先检查 `ffmpeg`/PDF 压缩工具是否存在。
- 输出到新文件并比较尺寸、时长和画质，确认后再替换原文件。
- 不得直接覆盖唯一原件；删除 backup 需要用户确认。

**验证：**

```bash
npm test
npm run build
du -h public/videos/* public/catalog.pdf
curl -sS -o /dev/null -w "%{http_code} %{size_download}\n" https://www.chjremote.com/videos/factory-hero-poster.jpg
```

重新运行 Lighthouse，目标：

- Mobile Performance >= 90
- Mobile Accessibility >= 95
- Mobile LCP <= 2.5 s
- 0 console errors
- 首次加载不下载完整视频

---

### Task 6：补产品与工厂证据

**目标：** 让采购者能做初步供应商筛选。

**文件建议：**

- Create: `src/data/products.js`
- Create: `src/data/company.js`
- Create: `src/data/caseStudies.js`
- Modify: `src/App.jsx`
- Add: `public/images/products/*`
- Add: `public/images/factory/*`
- Add: `public/images/certifications/*`
- Modify: `src/App.test.jsx`

**先做内容数据，再改布局：**

- [ ] `[OWNER INPUT]` 提供真实产品照片、型号和公开参数。
- [ ] 每个产品至少包含：型号、应用、频率、编码/协议方向、按钮/通道、供电、接收/发射配套、定制项、认证状态、MOQ/样品信息状态。
- [ ] 参数未知时显示 “Confirm with engineering”，不能猜。
- [ ] About 增加真实产线、RF 测试设备、质量流程、团队和证书；图片配具体说明。
- [ ] 案例采用“问题—约束—方案—结果—可公开范围”；没有证据就不放结果数字。
- [ ] 把长文章内容从 `App.jsx` 移到独立数据/Markdown 文件，降低误改风险。

**首页改造约束：**

- 一屏一个主信息，不新增卡片墙。
- 产品区必须有真实产品视觉。
- 工厂区必须有真实工序或设备视觉。
- 删除重复表达“我们很专业”的段落，用参数和过程代替。

**验收：**

- 采购者只扫描标题、图注和参数，就能判断是否值得联系。
- 所有公开事实可追溯到 claim register 或产品数据来源。
- `App.jsx` 不再包含整篇博客 HTML。

---

### Task 7：为博客文章建立独立、可抓取 URL

**目标：** 每篇文章成为独立搜索入口，而不是 Blog 页里的临时 state。

**决策门：**

这是一个架构阶段。执行前重新做上下文健康检查，并在独立任务中完成。不要与 Task 1–6 混在一个 PR。

**推荐方案：** 将内容页迁移到静态站点生成（优先评估 Astro），因为本站主要是静态营销内容，不需要整站客户端 React。这样可以为产品和文章生成真实 HTML、独立元数据和 sitemap。

**如果暂时不迁移：** 最低可接受方案是为每篇文章生成真实 HTML 入口，并让 `/blog/{slug}/` 直接返回 200；只加客户端路由但仍依赖 404 重定向，不算完成。

**每篇文章必须具备：**

- 独立 URL：`/blog/{slug}/`
- 唯一 title、description、canonical、Open Graph
- 静态 HTML 中可见的 h1 和正文摘要
- sitemap 条目和发布日期/修改日期
- Blog 列表中的真实 `<a href>`
- 浏览器刷新、后退、新标签页可用

**技术内容 QA：**

- [ ] 工程人员审核所有公式、单位、测试条件和绝对表述。
- [ ] 涉及法规/认证时只使用当前官方来源，并记录链接和复核日期。
- [ ] 区分理论链路预算、实验室结果和现场范围。
- [ ] 文章发布测试检查 title、canonical、h1、日期和内部链接。

**验收：**

```bash
curl -sS -I https://www.chjremote.com/blog/receiver-sensitivity-rf-range/
curl -sS https://www.chjremote.com/blog/receiver-sensitivity-rf-range/ | rg "<title>|canonical|<h1"
```

预期直接返回 200，HTML 不依赖点击后才能确定文章身份。

---

### Task 8：升级开发工具链

**目标：** 清理当前 Vite/Vitest/PostCSS 审计问题，不引入无关重构。

**文件：**

- Modify: `package.json`
- Modify: `package-lock.json`
- Possibly Modify: `vite.config.js`
- Possibly Modify: `vitest.config.js`

**步骤：**

- [ ] 在执行时查询官方迁移文档，确认当前 Node LTS 与目标 Vite/Vitest 兼容矩阵。
- [ ] 先升级可在当前 major 内安全修复的直接依赖。
- [ ] Vite/Vitest major 升级放在单独提交，逐项处理 breaking changes。
- [ ] 不运行 `npm audit fix --force`。
- [ ] 确认开发服务器只绑定本机，CI 只执行 build/test。

**验证：**

```bash
npm ci
npm test
npm run build
npm audit
git diff -- package.json package-lock.json vite.config.js vitest.config.js
```

**验收：**

- 测试和构建通过。
- 不再有 critical/high；若上游暂时无法修复，记录依赖链、影响范围和缓解措施。

---

### Task 9：扩展回归测试和发布检查

**目标：** 让后续低能力模型不容易把关键业务路径改坏。

**文件：**

- Modify: `src/App.test.jsx`
- Optional Create: `tests/seo.test.js`
- Optional Create: `scripts/check-site.mjs`
- Modify: `package.json`

**最低测试集合：**

- [ ] 首页 h1、主 CTA、产品证据区存在。
- [ ] 所有全局导航是链接且 href 正确。
- [ ] Contact 三条联系路径正确。
- [ ] 表单无模拟 alert；有 endpoint 时测试成功和失败。
- [ ] 移动菜单有可访问名称和状态。
- [ ] 每个页面只有一个 h1。
- [ ] 不存在改版说明式禁用短语。
- [ ] 博客文章 URL 与 metadata 正确。
- [ ] robots、sitemap 与 canonical 主机一致。
- [ ] poster 文件存在，视频不是 `preload="auto"`。

**发布前命令：**

```bash
npm ci
npm test
npm run build
npm audit
git status --short
```

**浏览器矩阵：**

- 390×844：移动首屏、菜单、联系按钮、文章阅读。
- 768×1024：平板布局。
- 1440×900 或 1440×1000：桌面首屏和全页层级。

**线上验收：**

- 关键 URL 直接返回 200。
- Lighthouse：Performance >= 90、Accessibility >= 95、SEO = 100。
- 0 console errors、0 broken assets、0 无效 robots 行。
- Email/电话/WhatsApp 可用。
- 真实表单收到测试询盘。

---

## 10. 建议的执行批次

为降低较低能力模型的出错率，按以下批次运行：

1. **批次 A：** Task 0 → Task 1。只处理事实和文案。
2. **批次 B：** Task 2。只处理转化。
3. **批次 C：** Task 3 → Task 4。只处理 URL 和 SEO 基础。
4. **批次 D：** Task 5。只处理媒体、首屏和可访问性。
5. **批次 E：** Task 6。需要业务资料，按页面逐个完成。
6. **批次 F：** Task 7。独立架构任务。
7. **批次 G：** Task 8 → Task 9。工具链和回归保障。

每个批次都应独立审查。若一个批次改动超过 10 个文件，拆成更小任务。

---

## 11. 完成定义

网站优化完成，不以“看起来更好”为准，而以这些结果为准：

- 用户能完成真实询盘，不再遇到模拟表单。
- 首屏说明产品、客户和能力，并在移动端立即出现真实证据。
- 所有强声明都有证据；没有匿名伪证明和内部改版说明。
- 产品与文章有真实 URL、独立元数据和可抓取内容。
- robots、sitemap、canonical、最终跳转 URL 一致。
- 移动 LCP 不高于 2.5 秒，Lighthouse 主要分数达到计划目标。
- 技术文章经过公式、单位、测试条件和法规来源复核。
- 测试覆盖导航、联系、SEO、媒体和关键内容约束。
- 低能力模型可以一次完成一个 Task，而不需要理解整个 1,089 行组件。
