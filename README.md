# vue-shop

项目实践笔记 - B站地址 [https://www.bilibili.com/video/av74592164]

项目资料地址 [https://pan.baidu.com/s/1z60ej714UHIZqFL4lzjIpg], 如果失效了去评论区找，我就是在那里找到的，也可以参考我这个 git 项目，如果顺利的话需要的资料都会有的

## 后端踩坑记录

1. 安装 phpStudy 之后导入 mydb.sql 失败，黑框一闪而过
    * 将 mydb.sql 放到全英文路径下在导入，问题解决。退一步说，我发现工具的db选项下有cmd模式应该可以通过那个手动导入的
    * setup 用到的东西都放到 resource 文件夹中了，需要的自己拿
    * phpStudy 太大了，git 上传死慢，删了
1. 到 `vue_api_server` 文件夹下 运行 `npm install` 安装需要的包，`node ./app.js` 启动服务其
2. 如果不想用 postman 也可以使用 vscode 的 rest client 发 request 还挺方便的

## 前端项目初始化

按装 vue 脚手架

```
# 使用国内镜像加速
npm install -g cnpm --registry=https://registry.npm.taobao.org

# 安装脚手架
cnpm install -g @vue/cli

# vue 创建项目的时候很慢，据说用下面的这个换国内源应该会好
npm config set registry https://registry.npm.taobao.org
```

插件选项中安装 vue-cli-plugin-element 插件
* import on demand
* zh-CN

依赖选项中安装 Axios 库


### 坑

1. 安装完后在终端输入 `vue ui` 没反应，输入 `vue` 发现没有 ui 这个命令，查了本地版本 `vue -V` 是 2.9.6， 貌似是只有 3.x 版本才有的，重新安装。我安装的时候最新已经是 4.x 了
1. 插件，库的安装进度可以从你启动 vue ui 的命令窗口看到

## 登录退出

写在最前： 这个格式检测真是恶心到我了！！！

1. 如果存在跨域问题，使用 token 保存登录状态
1. 如果不存在跨域，使用 session 和 cookie 保存状态

安装依赖, Development dependencies level 的依赖
* less
* less-loader

如果图标不合适，可以去第三方的图标库找找，比如阿里的图标库

绑定表单数据
1. el-form 添加 :model 属性
1. script-data 中定义 form 数据
1. el-input 添加 form.xx 属性

绑定表单验证
1. el-form 添加 :rules 属性
1. script-data 中定义 验证点
1. el-form-item 添加 prop 属性

el-form 添加 ref 属性，然后在 script 中定义 method 通过 this.$refs.loginFormRef 拿到引用

异步处理时需要在request中添加一些 async, await 之类的关键字

友好的信息提示：在 element.js 中导入 Message 并全局绑定，在提示的回调函数中使用 this.$message.success('登录成功') 给出弹框

路由导航守卫：权限检测，不符合，退回到登录页面

销毁 token 以实现登出