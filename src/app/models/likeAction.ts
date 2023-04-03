export class LikeAction{

    
    constructor(public postId:string,
                public uid:string,
                public liked:boolean,
                public likeActionId?:string){

                }
}