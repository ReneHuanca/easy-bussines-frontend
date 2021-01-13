class Customer
{
    
    constructor(name, email, phone, company, country, city, website, social, history, last_user, is_deleted = 1) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.company = company;
        this.country = country;
        this.city = city;
        this.website = website;
        this.social = social;
        this.history = history;
        this.last_user = last_user;
        this.is_deleted = is_deleted;
    }

}

export default Customer