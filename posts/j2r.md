---
title: 'from javascript to react'
date: '2022-08-10'
---

# 呈现用户界面

## DOM(document object model)

DOM是html元素的对象表示形式,  根据html文件的内容呈现为树状结构

![html-dom](E:\MyCode\next.js\notes\pic\html-to-dom.png)

通过DOM方法和编程语言(如JavaScript),  可以操作DOM结构

# 通过JavaScript和DOM更新UI

```html
<html>
    <body>
        <div id="app"></div>

        <script type="text/javascript">
            const app = document.getElementById('app');

            const header = document.createElement('h1');

            const headerContent = document.createTextNode('develop. preview.');

            header.appendChild(headerContent);

            app.appendChild(header);
        </script>
    </body>
</html>
```

## HTML vs the DOM

![](E:\MyCode\next.js\notes\pic\source-code.png)

HTML显示页面的初始内容;  DOM显示页面的更新后内容,  它由JavaScript的脚本代码更新

## imperative vs declarative Programming

- imperative 就像DOM方法,  逐步告诉计算机该做什么
- declarative 声明这个页面上有什么,  不关心具体步骤(react)

# 开始学习React

- react:  React内核库
- react-dom:  React with DOM

 ```html
 <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
 <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
 ```



使用来自react-dom库的ReactDOM.render()方法来操作DOM

```html
...
<script type="text/javascript">
    const app = document.getElementById('app');
    ReactDOM.render(<h1>hello</h1>,app)
</script>
```

以上代码会出现错误. `<h1>hello</h1>`不是JavaScript语法,  是JSX格式:

> JSX是JavaScript的语法扩展,  允许通过HTML形式的语法描述UI,  JSX遵循三个规则

## 通过Babel将JSX转化为常规JavaScript代码

```html
...
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/jsx">
      const app = document.getElementById('app');
      ReactDOM.render(<h1>hello</h1>, app);
</script>
```

使用`type=text/jsx`告知Babel转化代码

# React 核心概念

- components
- props
- state

## building UI with Components

用户界面可以被拆分为更小的块,  称为components

![](E:\MyCode\next.js\notes\pic\components.png)

### creating components

在React中,  components是functions,  返回UI 元素,  如下述函数header()

```jsx
<script type="text/jsx">
	const app = document.getElementById("app");

  	function Header() {
     	return <h1>hello</h1>;
  	}

  	ReactDOM.render(<Header \>, app);
</script>
```

有两个注意点:

- React components 首字母应该大写,  以区分它和HTML及JavaScript
- 使用React components需要使用HTML标记:  `<>`

### nesting components

```jsx
function Header() {
  return <h1>Develop. Preview. Ship. 🚀</h1>;
}

function HomePage() {
  return (
    <div>
      {/* Nesting the Header component */}
      <Header />
    </div>
  );
}
```

创建一个新的component`<HomePage>`,  将`<Header>`放入

### component trees

![](E:\MyCode\next.js\notes\pic\component-tree.png)

```jsx
ReactDOM.render(<HomePage />,app);
```

## Displaying Data with Props

对于通常的HTML元素,  可以设置各种属性(attributes)来使其呈现出不同效果,  例如`<img>`的`src`,  `<a>`的`href`

同样,  将信息片段作为React Components的属性传入,  称为`props`

### using props

```jsx
function Header(props) {
    console.log(props) // { title: "React 💙" }
//   return <h1>React 💙</h1>
// }

// function HomePage() {
//   return (
//     <div>
//       <Header title="React 💙" />
//     </div>
//   )
// }

// ReactDOM.render(<HomePage />, app)
```

props是一个对象,  包含`title`的值;  使用object destructuring解构`props`

```jsx
function Header({ title }){
    return <h1>{title}</h1>;
}
```

### using variables in JSX

如果需要使用js的变量,  则需要加上`{}`,  在括号内加入js的表达式,  如上述代码所示

表达式种类:

- `.`记号索引的对象性质 `props.title`

- 模板字符串 `Cool ${title}`

- 函数返回值
- 三目运算符

### iterating through lists

 ```jsx
 function HomePage() {
   const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];
 
   return (
     <div>
       <Header title="Develop. Preview. Ship. 🚀" />
       <ul>
         {names.map((name) => (
           <li key={name}>{name}</li>
         ))}
       </ul>
     </div>
   );
 }
 ```

- `<ul>`标签表示无序列表,  `<li>`标签表示列表元素
- 通过可迭代对象的`map`方法,  将其元素加上`<li>`标签,  作为一个列表.  `{}`内可以添加js的列表
- 对于React,  为了能够访问列表中的元素,  需要对`<li>`标签设置prop `key`

## Adding Interactivity with State

通过`<button>`标签添加按钮

```html
<button>like</button>
```

### listening to events

利用`onClick`事件,  规定事件发生时进行的操作

```html
<button onClick={}>Like</button>
```

事件名满足驼峰命名,  除`onClick`外,  还包括`onChange`, `onSubmit`等

### handling events

```jsx
function HomePage() {
  //    ...
  function handleClick() {
    console.log('increment like count');
  }

  return (
    <div>
      {/* ... */}
      <button onClick={handleClick}>Like</button>
    </div>
  );
}
```

创建一个`handleClick()`的事件处理函数,  当`onClick`事件触发时,  调用函数

### State and Hooks

React有一系列叫做`hooks`的函数,  允许对components添加额外的逻辑,  如`state`,  `state`是可以随程序运行而改变的某种信息

```jsx
function HomePage() {
  // ...
  const [likes, setLikes] = React.useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }}

  return (
    <div>
      {/* ... */}
      <button onClick={handleClick}>Likes ({likes})</button>
    </div>
  );
}
```

调用`React.useState()`来生成一个状态,  它的返回值是一个数组.  数组第一个元素是状态的值,  可以在括号中传入指定值来初始化它;  第二个元素是用于改变状态值的函数.  它们都可以被命名为任意值

- 调用`React.useState()`,  状态值用变量`likes`表示,  用于更新的函数用`setLikes`表示

- `handleClick`:  当点击按钮,  likes的值加一
- `Likes ({likes})`:  文本实时显示`likes`的值
