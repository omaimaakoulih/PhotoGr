export class Comment{

   
    public date!:number;
    
    constructor(public text:string,
                public idPots:string,
                public iduserComment:string){
                    
                    this.date = Date.now();
                }
}