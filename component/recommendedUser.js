import React from 'react';

function RecommendedUser() {
    return (
        <div className='recommendedUser'>
            
        <div className='pp'>
            <img className='userImg' src='/static/users/user1.jpg' />
            <div style={{marginLeft:'12px'}} className='name' >
            <div>
                Sgc0014
            </div>
            <span style={{color:'#999', fontSize:"12px"}}>
                Instagram Recommended
            </span>
        </div>
      
        </div>
        <div className='followButton'>
            Follow
        </div>
            <style jsx>{`
                .recommendedUser{
                    display: flex;
                    justify-content: space-between;
                    
                }
                .userImg{
                    width:33px;
                    height: 33px;
                    border-radius:50%;
                }
                .pp{
                    display:flex;

                }
                .followButton{
                    color:#34c9fe;
                    cursor: pointer;
                }
            `}</style>
        </div>
    )
}

export default RecommendedUser;
