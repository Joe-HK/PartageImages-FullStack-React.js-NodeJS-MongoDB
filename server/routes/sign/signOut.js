


const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
      message: "Déconnecté !"
    })
  }
  
  export default {signout}