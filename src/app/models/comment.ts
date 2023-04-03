export class Comment{

    
    public date!:number;
    constructor(public text:string,
                public idPot:string,
                public iduserComment:string){
                    
                    this.date = Date.now();
                }
}