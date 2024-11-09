import { supabase, supabaseAnonKey } from "../app/lib/supabase";
import { uploadFile } from "./imageService";

 export  const createOrUpdatePost = async (post)=>{
    try{
        //upload post file
        if(post.file && typeof post.file =='object'){
            let isImage = post?.file?.type =="image";
            let folderName = isImage?'postImages':"postVideos";
            let fileResult = await uploadFile(folderName,post?.file?.uri,isImage);
            if(fileResult.success)
            {
                post.file=fileResult.data;
            }
            else{
                return fileResult;
            }
            const {data,error}= await supabase
            .from('posts')
            .upsert(post)
            .select()
            .single();


            if(error){
                console.log("create post",error);
                return{success:false, msg:"could not create a post "}
            }
            return {success:true,data:data};
            

        }
    }catch(error){
        console.log("create post",error);
        return{success:false, msg:"could not create a post "}
    }

 }

 export  const fetchPosts = async (limit=12)=>{
    try{
        const{data,error}=await supabase 
        .from("posts")
        .select("*, user:profiles(id, name, image),postLikes(*)")
        .order("created_at",{ascending:false})
        .limit(limit)


        if(error){
            console.log("fetch post error",error);
            return{success:false, msg:"could not able fetch posts "}
        }
        return {success:true,data:data};

    }catch(error){
        console.log("fetch post error",error);
        return{success:false, msg:"could not able fetch posts "}
    }

 }

 export  const createPostLike = async (postLike)=>{
    try{
        const {data,error}= await supabase
        .from("postLikes")
        .insert(postLike)
        .select()
        .single();

        if(error){
            console.log("post Like  error",error);
            return{success:false, msg:"could not like this post"}
        }
        return {success:true,data:data};

    }catch(error){
        console.log("post like error",error);
        return{success:false, msg:"could not like this post"}
    }

 }
 export  const removePostLike = async (postId, userId)=>{
    try{
        const {error}= await supabase
        .from("postLikes")
        .delete()
        .eq('userId',userId)
        .eq('postId',postId)


        if(error){
            console.log("post Like  error",error);
            return{success:false, msg:"could not remove like"}
        }
        return {success:true};

    }catch(error){
        console.log("post like error",error);
        return{success:false, msg:"could not remove like"}
    }

 }