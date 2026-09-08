# 疯狂魔法厨房 (Crazy Magic Kitchen)

儿童执行功能（抑制控制）训练游戏：化身魔法厨房疯狂主厨，在魔力传送带上为3位VIP奇异兽食客上菜与监测危险！

## 本地开发与构建

```bash
# 安装依赖
npm install

# 启动本地开发服务 (http://localhost:3000)
npm run dev

# 打包生产环境静态文件
npm run build
```

打包完成后，生成的生产文件位于 `dist/` 目录中。

---

## 为什么放到 GitHub Pages 打开会是空白？（已修复）

之前在 GitHub Pages 打开白屏主要有两个原因：

### 原因一：资源引用路径未设置相对路径（已在 `vite.config.ts` 中修复为 `base: './'`）
* **原理解析**：Vite 默认的打包路径是绝对路径 `/assets/`。当项目部署在 GitHub Pages（例如 `https://<用户名>.github.io/<仓库名>/`）时，浏览器会去访问根域名下的 `https://<用户名>.github.io/assets/...`，导致资源 404 找不到，页面由于无法加载 JavaScript 而呈现空白。
* **已解决**：已在 `vite.config.ts` 中配置 `base: './'`，所有 CSS 与 JS 资源均转为相对路径引用。

### 原因二：直接把源代码发布到了 GitHub Pages，而不是打包后的 `dist/`
* **原理解析**：项目根目录的 `index.html` 引用的是 `/src/main.tsx`，浏览器原生无法直接运行 TypeScript/JSX 代码。必须运行打包编译后的 `dist/` 目录。

### 推荐解决方式：

#### 方式 A（最推荐，已内置 GitHub Actions 自动构建部署）
本项目已为您创建了 `.github/workflows/deploy.yml` 自动化工作流：
1. 将代码 Push 推送到 GitHub 仓库的 `main` 分支。
2. 打开 GitHub 仓库的 **Settings** -> **Pages**。
3. 在 **Build and deployment** 下方的 **Source** 中，选择 **GitHub Actions**。
4. 稍等 1 分钟，GitHub Actions 就会自动打包 `dist` 并发布上线，点击生成的链接即可直接游玩！

#### 方式 B（本地打包后上传 dist）
1. 在本地运行 `npm run build`。
2. 将生成的 `dist` 目录内的所有文件直接上传发布到 GitHub Pages 所在分支即可。
