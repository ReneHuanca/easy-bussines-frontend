export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('userToken'));

    if (user && user.access_token) {
        return { Authorization: 'bearer ' + user.access_token }; // for Laravel Boot back-end
        // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
        return {};
    }
}

// class Token
// {

//     authHeader() {
//         const user = this.getWithExpiry('userToken');

//         if (user && user.access_token) {
//             return { Authorization: 'bearer ' + user.access_token };
//         } else {
//             return null;
//         }
//     }

//     setWithExpiry(key, value, ttl) {
//         const now = new Date();
//         const item = {
//             value: value,
//             expiry: now.getTime() + ttl
//         }
//         localStorage.setItem(key, JSON.stringify(item))
//     }

//     getWithExpiry(key) {
//         const itemstr = localStorage.getItem(key);
//         if(!itemstr) {
//             return null;
//         }
//         const item = JSON.parse(itemstr);
//         const now = new Date();
//         if(now.getTime() > item.expiry) {
//             localStorage.removeItem(key);
//             return null;
//         }
//         return item.value;
//     }

// }

// export default Token;