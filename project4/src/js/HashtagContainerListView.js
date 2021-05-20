import {HashtagContainerView} from './HashtagContainerView.js'


export class HashtagContainerListView{
    constructor(hashtagData){
        this.hashtagContainer = {};
        const $div = document.getElementsByClassName("hashtag-container-list")[0];
        for(let hashtagTitle in hashtagData){
            const hashtagContainerView = new HashtagContainerView(hashtagTitle, hashtagData[hashtagTitle], this);
            this.hashtagContainer[hashtagTitle] = hashtagContainerView;
            $div.appendChild(hashtagContainerView.getDom());
        }
    }

    report(hashtagTitle, hashtagName){
        console.log(hashtagTitle, hashtagName);
    }

    click(hashtagTitle, hashtagName){
        this.hashtagContainer[hashtagTitle].click(hashtagName);
    }
}