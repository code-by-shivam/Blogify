import api from "@/api";


export async function getBlogs(page){
    try{
        const response = await api.get(`blog_list/?page=${page}`)
        return response.data;
    }
    catch(err){
        throw new Error(err.message)
    }
}

export async function getBlog(slug){
    try{
        const response = await api.get(`blogs/${slug}/`)
        return response.data;
    }
    catch(err){
        throw new Error(err.message)
    }

}
export async function registerUser(data){
    try{
        const response = await api.post("register_user/", data);
        return response.data;
    }
    catch(err){
        console.log(err);
        if(err.status == 400 ){
            throw new Error("User with this username already exists");
        }
        throw new Error(err);
    }   
}

export async function signin(data){
    try{
        const response = await api.post("token/",data)
        return response.data
    }
    catch(err){
        if(err.status ===401){
            throw new Error("Invalid Credentials")
        }
        throw new Error(err)
    }
}

export async function getUsername(){
    try{
        const response = await api.get("get_username/")
        return response.data
    }
    catch(err){
        throw new Error(err.message)
    }

}