import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')
let isLiked=false
let isRetweeted= false

document.addEventListener("click",function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
        
    }
    if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
        
    }
    if(e.target.dataset.replies){
        handleReplyClick(e.target.dataset.replies)
    }
   
})




 document.getElementById("tweet-btn").addEventListener("click",function(){
     if(tweetInput.value){
         
      tweetsData.unshift({
        handle: `@Scrimba`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    })
    render()
    tweetInput.value=''
     }
})



function handleReplyClick(replyId){
   document.getElementById(`replies-${replyId}`).classList.toggle("hidden") 
}



function handleLikeClick(tweetId){
   
    let targetTweetObj=tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    if(targetTweetObj.isLiked){
    targetTweetObj.likes--
         
    }else{
        targetTweetObj.likes++
        
}
     targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()    
    }
    
    
    function handleRetweetClick(tweetId){
        let targetTweetObj=tweetsData.filter(function(tweet){
            return tweet.uuid === tweetId
        })[0]
        if(targetTweetObj.isRetweeted){
            targetTweetObj.retweets--
           
        }else{
            targetTweetObj.retweets++
            
    }
    targetTweetObj.isRetweeted= !targetTweetObj.isRetweeted
        
        render()
       }
    
        




function getFeedHtml(){
let feed=``
    tweetsData.forEach(function(tweet){
        
      let likeClass=''
      let retweetClass=''
      if(tweet.isLiked){
          likeClass='liked'
      }
      
      if(tweet.isRetweeted){
          retweetClass='retweeted'
      }
        
        let repliesHtml=''
        if(tweet.replies.length>0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
                 <div class="tweet-reply">
    <div class="tweet-inner ">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>
                `
            })
        }
        
        
        
        
    
feed+=`
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots " data-replies="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeClass}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetClass}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
                
            </div>   
        </div>            
    </div>
    <div id="replies-${tweet.uuid}" class="hidden">
    ${repliesHtml}
    </div>
    
</div>`


    })
    return feed
}

function render(){
    document.getElementById("feed").innerHTML=getFeedHtml()
    }
render()


// <div class="tweet-reply">
//     <div class="tweet-inner">
//         <img src="PROFILE PIC" class="profile-pic">
//             <div>
//                 <p class="handle">HANDLE</p>
//                 <p class="tweet-text">TWEET TEXT</p>
//             </div>
//         </div>
// </div>