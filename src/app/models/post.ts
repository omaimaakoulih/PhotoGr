export class Post{

    public likes!:number;
    public date!:number;
    public image!:string;

    constructor(
        public userId:string,
        public description:string
    ){
        this.likes=0;
        this.date = Date.now();
        
    }
}