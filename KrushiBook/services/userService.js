import { supabase } from "../app/lib/supabase";

export const getUserData =async(userID)=>{
    try{
        const {data,user}= await supabase
        .from('profiles')
         .select()
            .eq('id',userID)
            .single();
            if(error){
                return{success:false,msg:error?.message} ;
            }

            return{success:true,data}; 

    }
    catch(error){
        console.log('error',error);
        return{success:flase,msg:error.message};
    }
}