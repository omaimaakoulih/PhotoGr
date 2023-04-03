import { NgModule } from "@angular/core";
import { CutePipe } from "./cutePipe";

@NgModule({
    declarations: [CutePipe],
    exports: [CutePipe]
  })
  export class CutePipeMod { }