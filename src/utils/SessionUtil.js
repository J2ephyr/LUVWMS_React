export default class SessionUtil {
    static getToken = () => {
      return sessionStorage.getItem('access_token');
    }
    static getUserNo = () => {
      return sessionStorage.getItem('UserNo');
    }
    static getRole = () => {
      return sessionStorage.getItem('Role');
    }
    static setToken = (token) => {
      sessionStorage.setItem('access_token',token);
    }
    static setUserInfo = (userNo,role) => {
      sessionStorage.setItem('UserNo',userNo);
      sessionStorage.setItem('Role',role);
    }
    static getAuth = () => {
        return JSON.parse(sessionStorage.getItem('Auth'));
    }
    static setAuth = (auth) => {
        auth =  JSON.stringify(auth);
        sessionStorage.setItem('Auth',auth);
    }
  }