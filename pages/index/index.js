
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    //这里新增了一个weather变量
    weather: {}
  },
  //事件处理函数，这就是刚刚在index.wxml当中绑定的事件函数
  bindViewTap: function() {
    //将函数的内容改写为我们自定义的一个方法
    this.getLocation()
  },
  //这个自定义方法调用了wx.getLocation和wx.request两个小程序API，用来获取用户位置信息并从远程服务器请求相关天气数据
  getLocation: function () {
    //示例中有很多这样that = this的代码，但我发现最新的开发者工具是支持ES6的，你完全可以用autobinding一类的语法糖来避免这些冗余的绑定代码
    var that = this
    //这是小程序的一个API，用来获取用户的地理位置
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        //wx.request用来发起向远程服务器的请求
        wx.request({
          //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
          url: 'https://api.thinkpage.cn/v3/weather/now.json?key=njghm0yptccbjo8g&location='+latitude+':'+longitude, 
          success: function(res) {
            console.log(res.data.results[0])
            //setData方法可以理解为React当中的setState方法，用来修改我们在开头定义的weather变量，你不能直接通过data.weather来修改，那样的操作会破坏数据绑定
            that.setData({
              weather:res.data.results[0]
            })
          }
        })
      }
    })
  },
  //onLoad是页面的一个生命周期函数，类似于App对象中的，小程序的页面和应用对象都有一系列相关的生命周期函数
  onLoad: function () {
    console.log('onLoad')
    //这里再啰嗦一下，因为对象中的方法this默认指向undefined，所以我们需要手动指定this，这段代码还可以写成：
    /**
    * app.getUserInfo(function(userInfo){
    *    //更新数据
    *    this.setData({
    *      userInfo:userInfo
    *    })
    * }.bind(this))
    * 或者使用es6写成：
    * app.getUserInfo((userInfo) => {
    *    this.setData({
    *      userInfo:userInfo
    *    })
    * })
    */
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    //that.getLocation()
  }
})