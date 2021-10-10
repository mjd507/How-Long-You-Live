import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import DateUtils from '../utils/DateUtils';
import StorageUtils from '../utils/StorageUtils';

@Component({
  selector: 'app-birth-to-now',
  templateUrl: './birth-to-now.component.html',
  styleUrls: ['./birth-to-now.component.scss']
})
export class BirthToNowComponent implements OnInit {

  initBirthDay: FormControl = new FormControl(new Date());

  livingDays: number = 0;
  targetLivingYears: number = 80;
  livingPercent: string = (this.livingDays / 365 / this.targetLivingYears * 100).toFixed(2);
  humanableDays: string = "";

  constructor() {
  }

  ngOnInit(): void {
    let val = StorageUtils.get("initBirthDay");
    if (val) {
      let timeInMilles = Number(val);
      // init birthday
      this.initBirthDay = new FormControl(new Date(timeInMilles));
      // calculate process
      this.calculate(timeInMilles);
    }
  }

  onBirthdayChange(type: string, event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const timeInMilles = event.value.getTime();
      // save to local storage
      StorageUtils.save("initBirthDay", timeInMilles + '');

      // calculate process
      this.calculate(timeInMilles);
    }
  }

  calculate(timeInMilles: number) {
    const diffDays = DateUtils.diffDays(timeInMilles, DateUtils.now());
    this.livingDays = diffDays;
    this.livingPercent = (this.livingDays / 365 / this.targetLivingYears * 100).toFixed(2);

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays - years * 365) / 31);
    const days = diffDays - years * 365 - months * 31;
    this.humanableDays = `${years} 年 ${months} 月 ${days} 日`;
  }

}
