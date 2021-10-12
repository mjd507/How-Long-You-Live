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

  menRetireAge : number = 60; // 男性退休年龄
  womenRetireAge : number = 55; // 女性退休年龄
  menRetirePercent: string = "0"; // 男性距离退休的进度
  womenRetirePercent: string = "0"; // 女性距离退休的进度

  targetLivingYears: number = 80;  // 目标生活时间
  livingPercent: string = (this.livingDays / 365 / this.targetLivingYears * 100).toFixed(2);  // 距离死亡的进度
  humanableDays: string = "0 天";  // livingDays 生活时间，人类可阅读的格式

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
    // 1. 已存在 xx 年 xx 月 xx 天
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays - years * 365) / 31);
    const days = diffDays - years * 365 - months * 31;
    this.humanableDays = `${years} 年 ${months} 月 ${days} 天`;
    // 2. 计算距离退休的进度
    this.menRetirePercent = (this.livingDays / 365 / this.menRetireAge * 100).toFixed(2);
    this.womenRetirePercent = (this.livingDays / 365 / this.womenRetireAge * 100).toFixed(2);
    // 3. 计算距离死亡的进度
    this.calcDeathProgress();
  }

  calcDeathProgress() {
    this.livingPercent = (this.livingDays / 365 / this.targetLivingYears * 100).toFixed(2);
  }

  onDeathAgeChange(event: any) {
    this.targetLivingYears = event.target.value;
    this.calcDeathProgress();
  }

}
