---
title: 'from react to next.js'
date: '2022-08-11'
---

# 开始使用Next.js

## index.html

```html
<html>
  <body>
    <div id="app"></div>

    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/jsx">
      const app = document.getElementById("app")

      function Header({ title }) {
        return <h1>{title ? title : "Default title"}</h1>
      }

      function HomePage() {
        const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"]

        const [likes, setLikes] = React.useState(0)

        function handleClick() {
          setLikes(likes + 1)
        }

        return (
          <div>
            <Header title="Develop. Preview. Ship. 🚀" />
            <ul>
              {names.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>

            <button onClick={handleClick}>Like ({likes})</button>
          </div>
        )
      }

      ReactDOM.render(<HomePage />, app)
    </script>
  </body>
</html>
```



## 使用本地包管理工具

安装Node.js,  可以使用包管理工具`npm`将需要的依赖下载到本地

## 使用package.json

- 创建package.json

  ```json
  {
  }
  ```

- 安装依赖包:  `npm install react react-dom next`

- package.json

  ```json
  {
    "dependencies": {
      "next": "^12.1.0",
      "react": "^17.0.2",
      "react-dom": "^17.0.2"
    }
  }
  ```

- `node_modules`文件夹包括下载到本地的依赖包

## 修改index.html文件

- 删除`react`和`react-dom`脚本块
- 删除`<html>`和`<body>`标签,  Next.js会自动创建
- 删除有关标识`app`的所有代码和`ReactDom.render()`方法
- 删除`Babel`脚本块,  Next.js会完成JSX到JavaScript的转化
- 删除`<script type="text/jsx">`标签
- `useState()`方法通过代码`import {useState} from 'react';`引入,  直接调用

文件变为JSX文件,  可以改变后缀为`.js`或`.jsx`

## 构建Next.js应用

- 将`index.js`文件移动到文件夹`pages`中

- 声明页面的主组件,  帮助Next.js区分

  ```jsx
  export default function HomePage(){...}
  ```

- 在`package.json`中指定运行Next.js开发服务器(development server)

  ```json
  // package.json
  {
  "scripts": {
      "dev": "next dev"
  },
   // "dependencies": {
   //   "next": "^11.1.0",
   //   "react": "^17.0.2",
   //   "react-dom": "^17.0.2"
   // }
  }
  ```

## 运行开发服务器(development server)

- 使用`npm run dev`运行服务器
- 在地址`localhost:3000`中可以看到页面



## index.js

```jsx
import { useState } from 'react';

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header title="Develop. Preview. Ship. 🚀" />
      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>Like ({likes})</button>
    </div>
  );
}
```



# How Next.js Works

## To Production

当产品需要投入使用,  Next.js能够提供compiling(将JSX转化为JavaScript), minifying(去掉代码中空格,  换行符等多余部分),  bundling(解析依赖关系,  将文件合并或打包为`bundles`,  减少浏览器对其请求)

## Code Splitting

应用一般有多个页面,  将bundle分割为多个chunks可以降低读取时的负载.

Next.js应用中,  `pages/`目录下的会自动分割为独立的bundle

## Build Time

当构建应用时,  需要将代码转换成一系列文件部署在服务器上,  包括:

- HTML文件,  描述静态页面
- JavaScript代码,  用于生成页面
- JavaScript代码,  用于生成交互效果
- CSS文件

## Runtime

一般描述应用运行时的阶段,  在构建和部署完成后

## Rendering

将用React写的代码转化为UI界面的HTML形式,  这个过程叫做`rendering`

- Server-Side Rendering(pre-rendering)
- Static Site Generation(pre-rendering)
- Client-Side Rendering

## Network

- Origin Server:  保存和运行主要代码
- Content Delivery Network(CDN):  把服务器生成的静态内容缓存在距离用户较近的服务器
- The Edge:  距离用户更近,  除了缓存静态内容外还可以执行部分代码
