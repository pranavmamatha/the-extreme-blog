export function checklogin(){
    const token = localStorage.getItem("token");
    if(token){
        return true
    } else{
        return false
    }
}