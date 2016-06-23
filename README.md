# avalon
> 这里共有3个版本大版本  web 是pc端的，wap是移动端的，admin是后台版本，l20n是国际版 ，router 是关于路由的例子，所有版本都依赖node环境运行和构建，除web版不用node运行以外

1. avalon-require-web

        pc端版本 使用require管理模块  使用gulp进行构建 支持所有浏览器  任何服务下运行index.html 即可


2. avalon-require-wap , avalon-require-admin , avalon-require-l20n

        这3个版本都以 webpack 构建和打包 效率更优 ,wap 转为移动端考虑的,admin 只支持IE10以上的高级浏览器。
        npm install 安装依赖包
        node server.js 运行

3. avalon-router
        是关于路由的使用例子，自己去体会不做解释，本地服务可以直接运行index.html 即可