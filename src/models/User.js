class User 
{

    constructor(name , email, password) {
        this.name = name
        this.first_name = ""
        this.last_name = ""
        this.address = "" 
        this.city = ""
        this.country = ""
        this.about_me = ""
        this.phone = ""
        this.email = email
        this.last_user = ""
        this.password = password
        this.password_confirmation = "";
    }

}

export default User