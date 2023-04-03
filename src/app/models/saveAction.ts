export class SaveAction{

    
    constructor(public postId:string,
                public uid:string,
                public saved:boolean,
                public saveActionId?:string){

                }
}