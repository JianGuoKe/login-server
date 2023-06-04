const Profile = require("../models/profile")

module.exports = (app) => {
  app.get("/profile", (req, res) => {
    if (!req.user) {
      return res.status(401).end()
    }
    Profile.find({
      userId: req.user._id,
      disabled: false,
    }).then((docs) => {
      res.json(
        docs.reduce((ret, doc) => {
          ret[doc.key] = doc.value
          return ret
        }, {}),
      )
    })
  })

  app.get("/profile/keys", (req, res) => {
    if (!req.user) {
      return res.status(401).end()
    }
    // console.log(req.user)
    Profile.find({
      userId: req.user._id,
      disabled: req.query.disabled ? undefined : false,
    })
      .select("key")
      .then((docs) => {
        res.json(docs.map((doc) => doc.key))
      })
  })

  app.get("/profile/:key", (req, res) => {
    if (!req.user) {
      return res.status(401).end()
    }
    Profile.findOne({
      userId: req.user._id,
      key: req.params.key,
      //   disabled: req.query.disabled ? undefined : false,
    }).then((doc) => {
      delete doc.userId
      res.json(doc)
    })
  })

  app.post("/profile/:key", (req, res) => {
    if (!req.user) {
      return res.status(401).end()
    }
    Profile.updateOne(
      { userId: req.user._id, key: req.params.key },
      {
        $set: {
          ...req.body,
          userId: req.user._id,
          key: req.params.key,
        },
      },
      {
        new: true,
        upsert: true,
      },
    ).then((doc) => {
      res.json(doc)
    })
  })

  app.delete("/profile/:key", (req, res) => {
    if (!req.user) {
      return res.status(401).end()
    }
    Profile.findOneAndDelete({
      userId: req.user._id,
      key: req.params.key,
    }).then((doc) => {
      res.json(doc)
    })
  })
}
