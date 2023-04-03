export class Post{

    public postId:string ="";
    public color!:string;
    public saved!:string;
    constructor(
        public userId:string,
        public description:string,
        public date:number,
        public likes:number,
        public image?:string
    ){
        this.color = "primary";
        this.saved = "bookmarks-outline";
    }

    public setPostId(id:string){
        this.postId = id;
    }
}