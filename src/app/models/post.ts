export class Post{

    public likes!:number;
    public date!:number;

    constructor(
        public userId:string,
        public image:string,
        public description:string
    ){
        this.likes=0;
        this.date = Date.now();
    }
}