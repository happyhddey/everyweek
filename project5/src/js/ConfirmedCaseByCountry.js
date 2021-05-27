/* ConfirmedCaseByCountry.js: 국가별 확진자 수를 관리 */

import { ConfirmedCaseLevel } from './ConfirmedCaseLevel.js';
import { DateList } from './DateList.js';

export class ConfirmedCaseByCountry{
    constructor(covidData){
        this.dateList = new DateList();
        this.confirmedCaseLevel = new ConfirmedCaseLevel();
        this.caseByCountry = {};
        for(let countryCode in covidData){
            if(this.isRightCountryCode(countryCode)){
                this.caseByCountry[countryCode] = this.getConfirmedCaseByDate(covidData[countryCode].data);
            }
        }
    }

    isRightCountryCode(countryCode){
        return countryCode.length === 3;
    }

    getConfirmedCaseByDate(data){
        const confirmedCaseByDate = {};
        for(let d of data){
            if(d.total_cases !== undefined){
                confirmedCaseByDate[d.date] = d.total_cases;
                this.dateList.updateDate(d.date);
                this.confirmedCaseLevel.updateScale(d.total_cases);
            }
        }
        return confirmedCaseByDate;
    }

    getNumConfirmedCase(countryCode, date){
        let message = "No Information";
        if(this.caseByCountry.hasOwnProperty(countryCode) && this.caseByCountry[countryCode][date] != undefined){
            const numConfirmedCase = this.caseByCountry[countryCode][date];
            let temp = numConfirmedCase.toString(10);
            let i = temp.length % 3;
            let parts = i ? [temp.substr(0, i)] : [];
            for(; i<temp.length; i+=3){
                parts.push(temp.substr(i, 3));
            }
            message = parts.join(',');
        }
        return message;
    }
    
    getLevel(countryCode, date){
        let level = this.confirmedCaseLevel.getDefaultLevel();
        if(this.caseByCountry.hasOwnProperty(countryCode) && this.caseByCountry[countryCode][date] != undefined){
            const numConfirmedCase = this.caseByCountry[countryCode][date];
            level = this.confirmedCaseLevel.getLevel(numConfirmedCase);
        }
        return level;
    }

    getList(){        
        return this.caseByCountry;
    }

    getDateList(){
        return this.dateList.getList();
    }

    getLevelList(){
        return this.confirmedCaseLevel.getLevelList();
    }

    getLatestDate(){
        return this.dateList.getLatestDate();
    }
}