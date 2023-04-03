import { Pipe , PipeTransform} from "@angular/core";

@Pipe({
  name: 'transDate'
})

export class DateTimePipe implements PipeTransform{
    timeDiffs = {
        minute: 60 * 1000,
        hour: 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        year: 365 * 24 * 60 * 60 * 1000
      };


    transform(value: string | number |Date) {
        const now = Date.now();
        const then = new Date(value).getTime();
        const diff = now - then;

        if (diff < this.timeDiffs.minute) {
            return 'few seconds';
          } else if (diff < this.timeDiffs.hour) {
            return '1h';
          } else if (diff < this.timeDiffs.day) {
            return '1 day';
          } else if (diff < this.timeDiffs.week) {
            return 'few days';
          } else if (diff < this.timeDiffs.month) {
            return 'few weeks';
          } else if (diff < this.timeDiffs.year) {
            return 'few months';
          } else {
            return 'years ago';
          }
          
    }

}