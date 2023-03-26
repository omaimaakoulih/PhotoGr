import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'truncate'
  })
export class CutePipe implements PipeTransform{
    transform(value: string,maxLenght : number) : string{
        if(value.length> maxLenght){
            return value.substring(0,maxLenght) + "..."
        }
        else{
            return value;
        }
    }

}