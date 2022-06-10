module.exports = {
    // define auth functions
    getUser: function(){
        // if there is a user present in session storage
        const user = sessionStorage.getItem("user");
        if (user === "" || !user) {
            return null;
        } else {
            return JSON.parse(user);
        }
    },

    getToken: function(){
        return sessionStorage.getItem("token");
    },
    getID: function(){
        return sessionStorage.getItem("id");
    },

    // set current user session in session storage, pass in user and token
    setUserSession: function(user, token){
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("id", JSON.stringify(user.id));
        sessionStorage.setItem("token", token);
    },

    setNotes: function(notes){
        sessionStorage.setItem("notes", JSON.parse(notes));
    },

    resetUserSession: function(){
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
    }
}