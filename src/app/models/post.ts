export class Post{

    
    

    constructor(
        public userId:string,
        public description:string,
        public date:number,
        public likes:number,
        public image?:string
    ){
       
        
    }
}