"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[79],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),f=c(n),d=o,b=f["".concat(s,".").concat(d)]||f[d]||p[d]||a;return n?r.createElement(b,i(i({ref:t},u),{},{components:n})):r.createElement(b,i({ref:t},u))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},7280:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return u},default:function(){return f}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={sidebar_position:3},s="\u89e3\u6790xlsx",c={unversionedId:"tutorial-basics/parse-file",id:"tutorial-basics/parse-file",isDocsHomePage:!1,title:"\u89e3\u6790xlsx",description:"`jsx live",source:"@site/docs/tutorial-basics/parse-file.mdx",sourceDirName:"tutorial-basics",slug:"/tutorial-basics/parse-file",permalink:"/table-xlsx/zh/docs/tutorial-basics/parse-file",editUrl:"https://github.com/PengChen96/table-xlsx/edit/master/website/docs/tutorial-basics/parse-file.mdx",version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"\u5bfc\u51faxlsx",permalink:"/table-xlsx/zh/docs/tutorial-basics/export-file"},next:{title:"Deploy your site",permalink:"/table-xlsx/zh/docs/tutorial-basics/deploy-your-site"}},u=[],p={toc:u};function f(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u89e3\u6790xlsx"},"\u89e3\u6790xlsx"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},'function MyComponent() {\n    const { Dragger } = Upload;\n    const [data, setData] = React.useState([]);\n    const [cols, setCols] = React.useState([]);\n    const handleFile = (file) => {\n        parseFile({file}).then((result) => {\n          const columns = result.tables[0].columns.map((col) => {\n            col.ellipsis = true;\n            return col;\n          });\n          setData(result.tables[0].dataSource);\n          setCols(columns);\n        });\n    }\n\n    const props = {\n      name: \'file\',\n      showUploadList: false,\n      beforeUpload: (file) => {\n        handleFile(file);\n      }\n    };\n    return <div>\n        <Dragger\n            {...props}\n        >\n            <p className="ant-upload-drag-icon">\n                <InboxOutlined />\n            </p>\n            <p className="ant-upload-text">Click or drag file to this area to upload</p>\n            <p className="ant-upload-hint">\n              Support for a single or bulk upload. Strictly prohibit from uploading company data or other\n              band files\n            </p>\n        </Dragger>\n        <Table\n            dataSource={data}\n            columns={cols}\n            scroll={{x: true}}\n            bordered\n            size={\'small\'}\n            pagination={false}\n            style={{marginTop: 20}}\n        />\n    </div>\n}\n')))}f.isMDXComponent=!0}}]);