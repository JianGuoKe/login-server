const WechatStrategy = require("passport-wechat").Strategy

function getToken(){
  console.log("getToken")
}
function saveToken(){
  console.log("saveToken")
}

module.exports = (options, provider, callback) =>
  new WechatStrategy(
    {
      ...options,
      // appID: {APPID},
      // name:{默认为wechat,可以设置组件的名字}
      // appSecret: {APPSECRET},
      // client:{wechat|web},
      // callbackURL: {CALLBACKURL},
      // scope: {snsapi_userinfo|snsapi_base},
      //   state:{STATE},
      getToken,
      saveToken, 
    },
    (req, accessToken, refreshToken, profile, expires_in, done) => {
      callback(
        req,
        accessToken,
        null,
        {
          id: profile.id,
          name: profile.displayName,
          username: profile.username,
          provider: provider.id,
          refreshToken,
          expires_in,
        },
        done,
      )
    },
  )
