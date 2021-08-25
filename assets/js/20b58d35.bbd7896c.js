"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[923],{3905:function(n,e,t){t.d(e,{Zo:function(){return u},kt:function(){return f}});var r=t(7294);function o(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function a(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(Object(t),!0).forEach((function(e){o(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function c(n,e){if(null==n)return{};var t,r,o=function(n,e){if(null==n)return{};var t,r,o={},a=Object.keys(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}(n,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(r=0;r<a.length;r++)t=a[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(o[t]=n[t])}return o}var l=r.createContext({}),s=function(n){var e=r.useContext(l),t=e;return n&&(t="function"==typeof n?n(e):i(i({},e),n)),t},u=function(n){var e=s(n.components);return r.createElement(l.Provider,{value:e},n.children)},p={inlineCode:"code",wrapper:function(n){var e=n.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(n,e){var t=n.components,o=n.mdxType,a=n.originalType,l=n.parentName,u=c(n,["components","mdxType","originalType","parentName"]),d=s(t),f=o,x=d["".concat(l,".").concat(f)]||d[f]||p[f]||a;return t?r.createElement(x,i(i({ref:e},u),{},{components:t})):r.createElement(x,i({ref:e},u))}));function f(n,e){var t=arguments,o=e&&e.mdxType;if("string"==typeof n||o){var a=t.length,i=new Array(a);i[0]=d;var c={};for(var l in e)hasOwnProperty.call(e,l)&&(c[l]=e[l]);c.originalType=n,c.mdxType="string"==typeof n?n:o,i[1]=c;for(var s=2;s<a;s++)i[s]=t[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},8445:function(n,e,t){t.r(e),t.d(e,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return u},default:function(){return d}});var r=t(7462),o=t(3366),a=(t(7294),t(3905)),i=["components"],c={sidebar_position:2},l="\u5bfc\u51faxlsx",s={unversionedId:"tutorial-basics/export-file",id:"tutorial-basics/export-file",isDocsHomePage:!1,title:"\u5bfc\u51faxlsx",description:"`jsx live",source:"@site/docs/tutorial-basics/export-file.mdx",sourceDirName:"tutorial-basics",slug:"/tutorial-basics/export-file",permalink:"/table-xlsx/docs/tutorial-basics/export-file",editUrl:"https://github.com/PengChen96/table-xlsx/edit/master/website/docs/tutorial-basics/export-file.mdx",version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"\u5b89\u88c5",permalink:"/table-xlsx/docs/tutorial-basics/start"},next:{title:"\u89e3\u6790xlsx",permalink:"/table-xlsx/docs/tutorial-basics/parse-file"}},u=[],p={toc:u};function d(n){var e=n.components,t=(0,o.Z)(n,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,t,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u5bfc\u51faxlsx"},"\u5bfc\u51faxlsx"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},"function MyComponent() {\n  const [data, setData] = React.useState([]);\n  const [cols, setCols] = React.useState([]);\n  React.useEffect(() => {\n    init();\n  }, [])\n  const init = () => {\n      const columns = [{\n        key: 'c1',\n        dataIndex: 'c1',\n        title: 'title1',\n        width: 100,\n        render: (text, row, index) => {\n          return {\n            children: <a>{text}</a>,\n            props: {\n              colSpan: index === 1 ? 2 : 1,\n            },\n          };\n        }\n      }, {\n        key: 'c2',\n        dataIndex: 'c2',\n        title: 'title2',\n        width: 100,\n        render: (text, row, index) => {\n          return {\n            children: <a>{text}</a>,\n            props: {\n              colSpan: index === 1 ? 0 : 1,\n            },\n          };\n        }\n      }, {\n        key: 'c3',\n        dataIndex: 'c3',\n        title: 'title3',\n        width: 100,\n        render: (text, row, index) => {\n          let rowSpan = 1;\n          if (index === 1) {\n            rowSpan = 2;\n          }\n          if (index === 2) {\n            rowSpan = 0;\n          }\n          return {\n            children: <a>{text}</a>,\n            props: {\n              rowSpan,\n            },\n          };\n        }\n      }, {\n        key: 'c4',\n        dataIndex: 'c4',\n        title: 'title4',\n        width: 100,\n        render: (text, row, index) => {\n          return <a>{text}</a>;\n        }\n      }];\n      const dataSource = [{\n        c3: 'data3',\n        c1: 'data1',\n        c2: 'data2',\n        c4: 'data4',\n      }, {\n        c1: 11,\n        c2: 22,\n        c3: 33,\n        c4: 44,\n      }, {\n        c1: 11,\n        c2: 22,\n        c3: 33,\n        c4: 44,\n      }];\n      setData(dataSource);\n      setCols(columns);\n    };\n  const onExportFileClick = () => {\n    exportFile({\n     sheetNames: ['a'],\n     columns: cols,\n     dataSource: data,\n    });\n  };\n  return (\n    <div>\n      <button onClick={() => onExportFileClick()}>export</button>\n      <div>\n        <Table\n          style={{marginTop: 20}}\n          dataSource={data}\n          columns={cols}\n          bordered\n          size={'small'}\n          pagination={false}\n        />\n      </div>\n    </div>\n  );\n}\n")))}d.isMDXComponent=!0}}]);